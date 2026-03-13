import { io, Socket } from 'socket.io-client'
import { ref, onUnmounted } from 'vue'

export const useChat = () => {
    const config = useRuntimeConfig()
    const { accessToken, user } = useAuthState()
    const socket = ref<Socket | null>(null)
    const messages = ref<any[]>([])
    const conversations = ref<any[]>([])
    const isConnected = ref(false)
    const isTyping = ref(false)
    const activeConversation = ref<any>(null)
    const loadingHistory = ref(false)
    const loadingConversations = ref(false)

    const connect = () => {
        if (socket.value?.connected) return

        const socketUrl = (config.public.apiBase as string).replace('/api/v1', '')
        socket.value = io(`${socketUrl}/chat`, {
            auth: { token: `Bearer ${accessToken.value}` },
            transports: ['polling', 'websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            timeout: 10000,
        })

        socket.value.on('connect', () => {
            isConnected.value = true
            console.log('Merchant Chat Socket Connected')
        })

        socket.value.on('disconnect', (reason) => {
            isConnected.value = false
            console.log('Merchant Chat Socket Disconnected:', reason)
            if (reason === 'io server disconnect') {
                socket.value?.connect()
            }
        })

        socket.value.on('connect_error', (error) => {
            console.error('Merchant Chat Connection Error:', error)
            isConnected.value = false
        })

        socket.value.on('chat:message:new', (msg) => {
            console.log('New message received:', msg)
            const incomingConvId = msg.conversationId?._id || msg.conversationId
            const activeConvId = activeConversation.value?._id || activeConversation.value

            if (activeConvId === incomingConvId) {
                if (!messages.value.find(m => m._id === msg._id)) {
                    messages.value.push(msg)
                }
            }
            updateConversationPreview(msg)
        })

        socket.value.on('chat:typing:state', (state) => {
            const activeConvId = activeConversation.value?._id || activeConversation.value
            if (state.userId !== user.value?._id && activeConvId === state.conversationId) {
                isTyping.value = state.isTyping
            }
        })
    }

    const updateConversationPreview = (msg: any) => {
        const convId = msg.conversationId?._id || msg.conversationId
        const idx = conversations.value.findIndex(c => c._id === convId)
        if (idx > -1) {
            conversations.value[idx].lastMessage = msg.content
            conversations.value[idx].lastMessageAt = msg.createdAt || new Date().toISOString()
            conversations.value[idx].lastMessageBy = msg.senderId?._id || msg.senderId

            // Move to top
            const conv = conversations.value.splice(idx, 1)[0]
            conversations.value.unshift(conv)
        } else {
            fetchConversations()
        }
    }

    const fetchConversations = async () => {
        loadingConversations.value = true
        try {
            const res: any = await $fetch(`${config.public.apiBase}/chat/conversations`, {
                headers: { Authorization: `Bearer ${accessToken.value}` }
            })
            conversations.value = res.data || []
        } catch (error) {
            console.error('Failed to fetch conversations:', error)
        } finally {
            loadingConversations.value = false
        }
    }

    const getParticipants = async (query = '') => {
        try {
            const res: any = await $fetch(`${config.public.apiBase}/users`, {
                headers: { Authorization: `Bearer ${accessToken.value}` },
                params: { search: query, limit: 100 }
            })
            // Only show superadmin/admin for merchants
            return (res.data || []).filter((u: any) => ['superadmin', 'admin'].includes(u.role || u.userType))
        } catch (error) {
            console.error('Failed to fetch participants:', error)
            return []
        }
    }

    const getHistory = async (conv: any) => {
        const idToJoin = typeof conv === 'string' ? conv : conv._id

        // Find existing conversation object if passing just ID
        if (typeof conv === 'string') {
            activeConversation.value = conversations.value.find(c => c._id === idToJoin) || { _id: idToJoin }
        } else {
            activeConversation.value = conv
        }

        messages.value = []
        loadingHistory.value = true

        connect()
        socket.value?.emit('chat:join', idToJoin)

        try {
            const res: any = await $fetch(`${config.public.apiBase}/chat/conversations/${idToJoin}/messages`, {
                headers: { Authorization: `Bearer ${accessToken.value}` }
            })
            messages.value = res.data || []
        } catch (error) {
            console.error('Failed to fetch chat history:', error)
        } finally {
            loadingHistory.value = false
        }

        // Mark as read
        try {
            await $fetch(`${config.public.apiBase}/chat/conversations/${idToJoin}/read`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${accessToken.value}` }
            })
        } catch { }
    }

    const createConversation = async (participants: string[], type: 'direct' | 'group' = 'direct') => {
        try {
            const res: any = await $fetch(`${config.public.apiBase}/chat/conversations`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken.value}` },
                body: { participants, type }
            })
            const newConv = (res as any)?.data
            if (newConv) {
                const exists = conversations.value.find((c: any) => c._id === newConv._id)
                if (!exists) {
                    conversations.value.unshift(newConv)
                }
                return newConv
            }
        } catch (error) {
            console.error('Failed to create conversation:', error)
        }
    }

    const uploadChatFile = async (file: File, folder = 'chat') => {
        const formData = new FormData()
        formData.append('file', file)
        try {
            const endpoint = file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/') 
                ? `/uploads/image/${folder}`
                : `/uploads/document/${folder}`;
            const res: any = await $fetch(`${config.public.apiBase}${endpoint}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken.value}` },
                body: formData
            })
            return res.url
        } catch (error) {
            console.error('File upload failed:', error)
            throw error
        }
    }

    const sendMessage = (content: string, type: string = 'text', attachments: string[] = [], replyTo?: string) => {
        const activeConvId = activeConversation.value?._id || activeConversation.value
        if (!socket.value || !activeConvId) {
            console.error('Cannot send message: no active connection or conversation')
            return
        }
        socket.value.emit('chat:message', {
            conversationId: activeConvId,
            content,
            type,
            attachments,
            replyTo
        })
    }

    const sendTyping = (state: boolean) => {
        const activeConvId = activeConversation.value?._id || activeConversation.value
        if (!socket.value || !activeConvId) return
        socket.value.emit('chat:typing', {
            conversationId: activeConvId,
            isTyping: state
        })
    }

    onUnmounted(() => {
        socket.value?.disconnect()
    })

    return {
        messages,
        conversations,
        isConnected,
        isTyping,
        activeConversation,
        loadingHistory,
        loadingConversations,
        connect,
        fetchConversations,
        getHistory,
        getParticipants,
        createConversation,
        sendMessage,
        sendTyping,
        uploadChatFile
    }
}
