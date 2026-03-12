import { auth_api } from '@/api_factory/modules/auth'

export const useSignup = () => {
    const loading = ref(false)
    const signup = async (payload: any) => {
        loading.value = true
        try {
            const res = await auth_api.register({ ...payload, userType: 'merchant', role: 'merchant' })
            return res
        } catch (error) {
            console.error('Signup error:', error)
        } finally {
            loading.value = false
        }
    }

    return { loading, signup }
}
