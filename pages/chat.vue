<template>
  <div class="h-screen w-screen bg-[#f0f2f5] flex overflow-hidden select-none font-sans text-gray-900">
    <!-- Left Sidebar -->
    <div class="w-[450px] border-r border-[#e9edef] flex flex-col bg-white shrink-0">
      <!-- Header -->
      <div class="h-[64px] px-4 bg-[#f0f2f5] flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="w-10 h-10 rounded-full bg-[#033958] flex items-center justify-center text-white hover:scale-105 transition-transform" title="Back to Dashboard">
             <Icon name="lucide:layout-dashboard" size="20" />
          </NuxtLink>
          <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">
            {{ user?.fullName?.charAt(0) || 'M' }}
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button @click="showNewChatModal = true" class="p-2.5 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors" title="New Chat">
            <Icon name="lucide:message-square-plus" class="w-5 h-5" />
          </button>
          <button class="p-2.5 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
            <Icon name="lucide:more-vertical" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="p-2.5 bg-white shrink-0 border-b border-[#f0f2f5]">
        <div class="relative group mb-3">
          <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-[#8696a0] group-focus-within:text-[#00a884] transition-colors" size="16" />
          <input
            v-model="searchQuery"
            placeholder="Search or start new chat"
            class="w-full bg-[#f0f2f5] border-none rounded-xl pl-12 pr-4 py-2 text-sm text-gray-700 focus:ring-0 placeholder:text-[#8696a0]"
          />
        </div>
        <div class="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          <button v-for="tab in ['All', 'Admin', 'Partner', 'Customer']" :key="tab"
            @click="activeTab = tab"
            :class="['px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors uppercase tracking-tight', 
              activeTab === tab ? 'bg-[#033958] text-white shadow-sm' : 'bg-[#f0f2f5] text-[#54656f] hover:text-gray-900']">
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Conversations -->
      <div class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div v-if="loadingConversations" class="p-12 flex justify-center">
          <Icon name="lucide:loader-2" class="w-8 h-8 text-[#033958] animate-spin" />
        </div>

        <div v-else-if="categorizedConversations.length === 0" class="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
          <div class="w-20 h-20 bg-[#f0f2f5] rounded-full flex items-center justify-center">
            <Icon name="lucide:message-square" class="w-10 h-10 text-gray-300" />
          </div>
          <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">No chats found</p>
          <button @click="showNewChatModal = true" class="px-6 py-2 bg-[#033958] text-white rounded-full text-xs font-bold hover:bg-[#055380] transition-colors shadow-lg shadow-[#033958]/10">
            Start New Chat
          </button>
        </div>

        <div v-else class="divide-y divide-[#f0f2f5]">
          <button
            v-for="conv in categorizedConversations"
            :key="conv._id"
            @click="getHistory(conv)"
            :class="[
              'w-full px-4 py-3 flex items-center gap-4 transition-all text-left group h-[72px]',
              activeConversation?._id === conv._id ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'
            ]"
          >
            <div class="relative shrink-0">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-sm"
                :class="getParticipantRole(conv) === 'admin' ? 'bg-[#033958]' : 'bg-indigo-500'">
                {{ getParticipantInitials(conv) }}
              </div>
            </div>

            <div class="flex-1 min-w-0 py-1">
              <div class="flex justify-between items-center mb-0.5">
                <span class="font-bold text-[16px] text-gray-900 truncate flex items-center gap-2">
                  {{ getParticipantName(conv) }}
                  <span v-if="getParticipantRole(conv)" class="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-tighter">{{ getParticipantRole(conv) }}</span>
                </span>
                <span class="text-[11px] text-gray-500 shrink-0 ml-2">
                  {{ conv.lastMessageAt ? formatRelativeTime(conv.lastMessageAt) : '' }}
                </span>
              </div>
              <p class="text-[14px] text-gray-500 truncate flex items-center gap-1 font-medium">
                <Icon v-if="isSentByMeLast(conv)" name="lucide:check-check" class="w-4 h-4 text-[#53bdeb]" />
                {{ conv.lastMessage || 'Tap to chat' }}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Area -->
    <div class="flex-1 flex flex-col bg-[#efeae2] relative overflow-hidden">
      <!-- Wallpaper -->
      <div class="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://as2.ftcdn.net/v2/jpg/04/40/25/11/1000_F_440251147_iM1JtDoz7vA63jK278XlH6gZkP6q3c9S.jpg')] bg-repeat"></div>

      <template v-if="activeConversation">
        <!-- Header -->
        <div class="h-[64px] px-4 flex items-center justify-between bg-[#f0f2f5] border-b border-[#e9edef] shrink-0 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
              :class="getParticipantRole(activeConversation) === 'admin' ? 'bg-[#033958]' : 'bg-indigo-500'">
              {{ getParticipantInitials(activeConversation) }}
            </div>
            <div class="min-w-0">
              <h2 class="font-bold text-[15px] text-gray-900 truncate tracking-tight flex items-center gap-2">
                {{ getParticipantName(activeConversation) }}
                <span v-if="getParticipantRole(activeConversation)" class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">({{ getParticipantRole(activeConversation) }})</span>
              </h2>
              <p class="text-[11px] text-gray-500 flex items-center gap-1 font-bold">
                <span v-if="isTyping" class="text-green-600 animate-pulse">typing...</span>
                <span v-else-if="isConnected" class="text-green-600 lowercase tracking-wide">online</span>
                <span v-else class="text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded text-[9px] uppercase font-black tracking-tighter">Connecting...</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 px-2">
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:search" class="w-5 h-5" />
            </button>
            <button class="p-2 text-[#54656f] hover:bg-gray-200 rounded-full transition-colors">
              <Icon name="lucide:more-vertical" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-12 space-y-1 relative z-10 custom-scrollbar scroll-smooth" ref="messagesContainer">
          <div v-if="loadingHistory" class="flex justify-center py-20">
            <Icon name="lucide:loader-2" class="w-10 h-10 text-[#033958] animate-spin" />
          </div>

          <template v-else>
            <template v-for="(msg, i) in messages" :key="msg._id || i">
               <!-- Date Separator -->
               <div v-if="showDateSeparator(i)" class="flex justify-center my-6">
                <span class="px-3 py-1.5 bg-white rounded-lg text-[11px] font-black text-gray-500 uppercase tracking-widest shadow-sm">
                  {{ formatDateSeparator(msg.createdAt) }}
                </span>
               </div>

               <div :class="['flex mb-1', isSentByMe(msg) ? 'justify-end' : 'justify-start']">
                <div :class="['max-w-[85%] md:max-w-[65%] flex flex-col', isSentByMe(msg) ? 'items-end' : 'items-start']">
                  <!-- Message Bubble -->
                  <div class="relative group flex items-center gap-2">
                    <!-- Reply Action Button (Hover) -->
                    <button v-if="!isSentByMe(msg)" @click="replyingToMessage = msg" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity absolute -right-8 z-10">
                      <Icon name="lucide:reply" size="14" />
                    </button>
                    <!-- Actual Bubble -->
                    <div :class="['relative p-2.5 shadow-sm min-w-[100px] transition-all', 
                      isSentByMe(msg) 
                        ? 'bg-[#dcf8c6] text-gray-800 rounded-lg rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-lg rounded-tl-none']">
                      
                      <!-- Reply Preview Block -->
                      <div v-if="msg.replyTo" class="mb-1 p-1.5 rounded bg-black/5 border-l-4 border-[#033958] text-[11px] opacity-90 cursor-pointer">
                        <p class="font-black text-[#033958] mb-0.5">{{ msg.replyTo.senderId?._id === user?._id ? 'You' : (msg.replyTo.senderId?.fullName || msg.replyTo.senderId?.email || 'User') }}</p>
                        <p class="text-gray-600 font-medium truncate max-w-[200px]">{{ msg.replyTo.content || (msg.replyTo.type !== 'text' ? msg.replyTo.type : 'Message') }}</p>
                      </div>

                      <!-- Attachments -->
                      <div v-if="msg.attachments?.length > 0" class="mb-2 max-w-[280px] overflow-hidden rounded">
                        <template v-for="(att, aIdx) in msg.attachments" :key="aIdx">
                           <img v-if="msg.type === 'image'" :src="att" class="w-full object-cover cursor-pointer hover:opacity-90 transition-opacity max-h-[300px]" @click="previewMedia = att" />
                           <video v-else-if="msg.type === 'video'" :src="att" controls class="w-full"></video>
                           <audio v-else-if="msg.type === 'audio'" :src="att" controls class="w-full"></audio>
                           <a v-else :href="att" target="_blank" class="flex flex-col gap-2 p-3 bg-black/5 rounded-lg text-[#033958] hover:bg-black/10 transition-colors border border-[#033958]/10">
                              <div class="flex items-center gap-3">
                                <Icon name="lucide:file-text" size="24" class="text-[#033958] shrink-0" />
                                <div class="min-w-0">
                                  <p class="text-[12px] font-bold truncate text-[#033958]">Document Attachment</p>
                                  <p class="text-[10px] text-gray-500 font-black uppercase tracking-tight">Click to view/download</p>
                                </div>
                              </div>
                           </a>
                        </template>
                      </div>
                      
                      <p class="text-sm font-medium leading-relaxed break-words pr-12 whitespace-pre-wrap">{{ msg.content }}</p>
                      
                      <span class="absolute bottom-1 right-2 flex items-center gap-1">
                        <span class="text-[9px] font-bold text-gray-400">{{ formatTime(msg.createdAt) }}</span>
                        <Icon v-if="isSentByMe(msg)" 
                          :name="msg.isRead ? 'lucide:check-check' : 'lucide:check'" 
                          :class="['w-3.5 h-3.5', msg.isRead ? 'text-[#53bdeb]' : 'text-gray-300']" />
                      </span>
                    </div>
                    <!-- Reply Action Button (Hover) for my messages -->
                    <button v-if="isSentByMe(msg)" @click="replyingToMessage = msg" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-700 transition-opacity absolute -left-8 z-10">
                      <Icon name="lucide:reply" size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>

        <!-- Reply Banner -->
        <div v-if="replyingToMessage" class="px-6 py-2 bg-[#f0f2f5] border-l-4 border-[#033958] flex items-center justify-between z-10 shrink-0">
          <div class="min-w-0">
            <p class="text-[11px] font-black text-[#033958] mb-0.5">Replying to {{ replyingToMessage.senderId?._id === user?._id ? 'yourself' : (replyingToMessage.senderId?.fullName || replyingToMessage.senderId?.email || 'User') }}</p>
            <p class="text-[11px] text-gray-500 font-medium truncate">{{ replyingToMessage.content || 'Attachment' }}</p>
          </div>
          <button @click="replyingToMessage = null" class="p-1 text-gray-400 hover:text-gray-700 transition-colors"><Icon name="lucide:x" size="16" /></button>
        </div>

        <!-- Uploading Banner -->
        <div v-if="isUploading" class="px-6 py-2 bg-white flex items-center gap-3 text-[#033958] text-[11px] font-black z-10 border-t border-gray-100 shrink-0">
          <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
          <span>Uploading attachment...</span>
        </div>

        <!-- Input -->
        <div class="px-6 py-3 bg-[#f0f2f5] flex items-center gap-3 relative z-10 shrink-0">
          <div class="relative">
            <button @click="showEmojiPicker = !showEmojiPicker; showAttachMenu = false" class="p-2 text-[#54656f] hover:text-[#033958] transition-colors">
              <Icon name="lucide:smile" class="w-6 h-6" />
            </button>
            <div v-if="showEmojiPicker" class="absolute bottom-12 left-0 bg-white border border-gray-200 p-3 rounded-xl shadow-xl grid grid-cols-6 gap-2 w-[220px] select-none z-50">
              <span v-for="emoji in ['😀','😂','🥺','❤️','🔥','👍','🎉','✨','🤔','🙌','😎','💯','✅','❌','👀','🚀','💸','🙏']" :key="emoji" @click="text += emoji" class="cursor-pointer hover:scale-125 transition-transform text-xl text-center">{{ emoji }}</span>
            </div>
          </div>
          
          <div class="relative">
            <button @click="showAttachMenu = !showAttachMenu; showEmojiPicker = false" class="p-2 text-[#54656f] hover:text-[#033958] transition-colors" :disabled="isUploading">
              <Icon name="lucide:paperclip" class="w-6 h-6" />
            </button>
            <div v-if="showAttachMenu" class="absolute bottom-12 left-0 bg-white border border-gray-200 p-2 rounded-xl shadow-xl flex flex-col gap-1 w-[150px] z-50">
              <button @click="triggerFileInput('image/*,video/*'); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:image" class="text-blue-500" size="16"/> Media
              </button>
              <button @click="triggerFileInput('.pdf,.doc,.docx'); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:file-text" class="text-purple-500" size="16"/> Document
              </button>
              <button @click="openCamera(); showAttachMenu = false" class="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-700 text-left">
                <Icon name="lucide:camera" class="text-rose-500" size="16"/> Camera
              </button>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" :accept="fileAccept" />
          </div>

          <div class="flex-1">
            <input 
              v-model="text" 
              @input="handleTyping"
              @keydown.enter.prevent="handleSend"
              placeholder="Type a message..." 
              class="w-full bg-white border-none rounded-xl py-3 px-5 text-sm font-medium focus:ring-0 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <button @click="handleSend" :disabled="(!text.trim() && !pendingAttachment) || isUploading" 
            class="w-11 h-11 bg-[#033958] text-white rounded-full flex items-center justify-center hover:bg-[#055380] transition-all active:scale-95 disabled:opacity-30 shadow-lg shadow-[#033958]/20 group shrink-0">
            <Icon :name="text.trim() || pendingAttachment ? 'lucide:send' : 'lucide:mic'" class="w-5 h-5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </template>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-12 relative z-10 bg-[#f8f9fa] border-b-[6px] border-[#033958]">
        <div class="mb-10 text-[#cbd5e1] p-12 bg-white rounded-full shadow-xl relative animate-bounce-subtle">
           <Icon name="lucide:message-circle" class="w-32 h-32" />
           <div class="absolute -bottom-2 -right-2 bg-[#033958] p-4 rounded-3xl shadow-lg ring-4 ring-white">
              <Icon name="lucide:shield-check" class="w-10 h-10 text-white" />
           </div>
        </div>
        <h2 class="text-[36px] font-black text-gray-900 mb-4 tracking-tighter">Merchant Connect</h2>
        <p class="text-gray-500 text-[15px] max-w-md font-medium leading-relaxed mb-10">
          Connect with Support and Partners instantly. <br/>
          Select a chat to begin messaging with end-to-end security.
        </p>
        <button @click="showNewChatModal = true" class="px-10 py-4 bg-[#033958] text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl shadow-[#033958]/30">
          Start New Conversation
        </button>
        <div class="absolute bottom-10 flex items-center gap-2 text-gray-400">
          <Icon name="lucide:lock" class="w-3.5 h-3.5" />
          <span class="text-[10px] font-black uppercase tracking-widest">End-to-end encrypted</span>
        </div>
      </div>
    </div>

    <!-- New Chat Modal -->
    <div v-if="showNewChatModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showNewChatModal = false"></div>
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div class="p-4 bg-[#f0f2f5] flex items-center justify-between border-b border-gray-200">
          <h3 class="font-bold text-lg text-gray-900">New Chat</h3>
          <button @click="showNewChatModal = false" class="p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <Icon name="lucide:x" size="20" />
          </button>
        </div>

        <div class="p-4">
          <div class="relative mb-4">
            <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size="14" />
            <input 
              v-model="userSearchQuery"
              @input="handleUserSearch"
              placeholder="Search by name or email"
              class="w-full bg-[#f0f2f5] border-none rounded-lg py-2 pl-9 pr-4 text-sm text-gray-900 focus:ring-1 focus:ring-[#033958] placeholder:text-gray-500"
            />
          </div>

          <div class="h-64 overflow-y-auto custom-scrollbar space-y-1">
            <div v-if="searchingUsers" class="flex justify-center py-10">
              <Icon name="lucide:loader-2" class="w-6 h-6 text-[#033958] animate-spin" />
            </div>
            <template v-else-if="users.length > 0">
              <button 
                v-for="u in users" 
                :key="u._id"
                @click="startChat(u)"
                class="w-full p-3 flex items-center gap-3 hover:bg-[#f8f9fa] rounded-xl transition-colors text-left group"
              >
                <div class="w-10 h-10 rounded-full bg-[#033958] flex items-center justify-center text-white font-bold text-sm">
                  {{ u.fullName?.charAt(0) || 'U' }}
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-900 group-hover:text-[#033958] transition-colors">{{ u.fullName }}</p>
                  <p class="text-xs text-gray-500 font-bold uppercase tracking-tight">{{ u.role || u.userType }}</p>
                </div>
              </button>
            </template>
            <div v-else class="flex flex-col items-center justify-center py-10 text-center opacity-50">
               <Icon name="lucide:users" class="w-8 h-8 mb-2" />
               <p class="text-xs font-bold text-gray-900">No stakeholders found</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Camera Modal -->
    <div v-if="showCamera" class="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div class="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden flex flex-col">
        <div class="p-4 bg-gray-900 flex items-center justify-between absolute top-0 w-full z-10 bg-transparent">
          <button @click="closeCamera" class="p-2 text-white hover:bg-white/10 rounded-full transition-colors drop-shadow-md">
            <Icon name="lucide:x" size="24" />
          </button>
        </div>
        <video ref="videoElement" class="w-full h-auto max-h-[70vh] object-cover bg-black" autoplay playsinline></video>
        <canvas ref="canvasElement" class="hidden"></canvas>
        <div class="p-6 bg-gray-900 flex justify-center border-t border-gray-800">
          <button @click="capturePhoto" class="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center hover:scale-105 transition-transform bg-blue-500/20 group">
            <div class="w-12 h-12 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Media Preview Overlay -->
    <div v-if="previewMedia" class="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md" @click="previewMedia = null">
      <button class="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors">
        <Icon name="lucide:x" size="24" />
      </button>
      <img :src="previewMedia" class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/modules/chat/useChat'
import { useAuthState } from '@/composables/useAuthState'
import { format, isToday, isYesterday, isSameDay } from 'date-fns'

definePageMeta({
  layout: 'chat'
})

const { user } = useAuthState()
const {
  conversations,
  messages,
  isConnected,
  isTyping,
  activeConversation,
  loadingConversations,
  loadingHistory,
  connect,
  fetchConversations,
  getHistory,
  getParticipants,
  createConversation,
  sendMessage,
  sendTyping,
} = useChat()

const text = ref('')
const searchQuery = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// Enhanced Chat State
const activeTab = ref('All')
const showEmojiPicker = ref(false)
const showAttachMenu = ref(false)
const replyingToMessage = ref<any>(null)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const fileAccept = ref('*/*')
const pendingAttachment = ref<string | null>(null)

// Camera state
const showCamera = ref(false)
const videoElement = ref<HTMLVideoElement | null>(null)
const canvasElement = ref<HTMLCanvasElement | null>(null)
let mediaStream: MediaStream | null = null
const previewMedia = ref<string | null>(null)

// New Chat Modal State
const showNewChatModal = ref(false)
const userSearchQuery = ref('')
const searchingUsers = ref(false)
const users = ref<any[]>([])

const categorizedConversations = computed(() => {
  let list = conversations.value
  
  if (activeTab.value !== 'All') {
    list = list.filter((c: any) => {
      const other = getOtherParticipant(c)
      const role = (other?.role || other?.userType || '').toLowerCase()
      if (activeTab.value === 'Admin' && ['admin', 'superadmin', 'support'].includes(role)) return true
      if (activeTab.value === 'Partner' && role === 'partner') return true
      if (activeTab.value === 'Customer' && role === 'customer') return true
      return false
    })
  }
  
  if (!searchQuery.value) return list
  
  const q = searchQuery.value.toLowerCase()
  return list.filter((conv: any) => {
    const name = getParticipantName(conv).toLowerCase()
    return name.includes(q)
  })
})

function handleSend() {
  if (!text.value.trim() && !pendingAttachment.value) return
  sendMessage(text.value.trim() || 'Attachment', 'text', [], replyingToMessage.value?._id)
  text.value = ''
  replyingToMessage.value = null
  showEmojiPicker.value = false
}

function triggerFileInput(accept: string) {
  fileAccept.value = accept
  if (fileInput.value) fileInput.value.click()
}

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  const file = target.files[0]
  
  isUploading.value = true
  try {
    const url = await useChat().uploadChatFile(file)
    let type = 'file'
    if (file.type.startsWith('image/')) type = 'image'
    else if (file.type.startsWith('video/')) type = 'video'
    else if (file.type.startsWith('audio/')) type = 'audio'
    else type = 'document'
    
    sendMessage(text.value || file.name, type, [url], replyingToMessage.value?._id)
    text.value = ''
    replyingToMessage.value = null
  } catch (err) {
    alert('Failed to upload file')
  } finally {
    isUploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

async function openCamera() {
  showCamera.value = true
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
    if (videoElement.value) {
      videoElement.value.srcObject = mediaStream
    }
  } catch (err) {
    alert('Camera access denied or unavailable')
    closeCamera()
  }
}

function closeCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop())
    mediaStream = null
  }
  showCamera.value = false
}

async function capturePhoto() {
  if (!videoElement.value || !canvasElement.value) return
  const video = videoElement.value
  const canvas = canvasElement.value
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d')?.drawImage(video, 0, 0)
  
  canvas.toBlob(async (blob) => {
    if (blob) {
      closeCamera()
      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' })
      isUploading.value = true
      try {
        const url = await useChat().uploadChatFile(file)
        sendMessage(text.value || 'Photo', 'image', [url], replyingToMessage.value?._id)
        text.value = ''
        replyingToMessage.value = null
      } catch (err) {
        alert('Failed to upload photo')
      } finally {
        isUploading.value = false
      }
    }
  }, 'image/jpeg', 0.8)
}

let typingTimeout: any = null
function handleTyping() {
  sendTyping(true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => sendTyping(false), 2000)
}

function getOtherParticipant(conv: any) {
  if (!conv?.participants) return null
  return conv.participants.find((p: any) => p._id !== user.value?._id) || conv.participants[0]
}

function getParticipantName(conv: any) {
  if (conv?.groupName) return conv.groupName
  const other = getOtherParticipant(conv)
  return other?.fullName || other?.email || 'User'
}

function getParticipantRole(conv: any) {
  const other = getOtherParticipant(conv)
  return (other?.role || other?.userType || '').toLowerCase()
}

function isSentByMeLast(conv: any) {
  const senderId = String(conv.lastMessageBy || '')
  const myId = String(user.value?._id || user.value?.id || '')
  return !!senderId && senderId === myId
}

function formatTime(date: any) {
  return date ? format(new Date(date), 'HH:mm') : ''
}

function formatRelativeTime(date: any) {
  if (!date) return ''
  const d = new Date(date)
  if (isToday(d)) return format(d, 'HH:mm')
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'dd/MM/yy')
}

function formatDateSeparator(date: any) {
  if (!date) return ''
  const d = new Date(date)
  if (isToday(d)) return 'TODAY'
  if (isYesterday(d)) return 'YESTERDAY'
  return format(d, 'MMMM d, yyyy').toUpperCase()
}

function showDateSeparator(index: number) {
  if (index === 0) return true
  return !isSameDay(new Date(messages.value[index].createdAt), new Date(messages.value[index - 1].createdAt))
}

// User Search for New Chat
let searchTimeout: any = null
async function handleUserSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    searchingUsers.value = true
    users.value = await getParticipants(userSearchQuery.value)
    searchingUsers.value = false
  }, 300)
}

async function startChat(participant: any) {
  const exists = conversations.value.find(c => 
    c.type === 'direct' && 
    c.participants.some((p: any) => p._id === participant._id)
  )

  if (exists) {
    getHistory(exists)
  } else {
    const newConv = await createConversation([participant._id])
    if (newConv) getHistory(newConv)
  }
  showNewChatModal.value = false
}

watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })

onMounted(async () => {
  connect()
  await fetchConversations()
  users.value = await getParticipants()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
