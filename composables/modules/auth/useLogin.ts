import { ref } from "vue"
import { auth_api } from "@/api_factory/modules/auth"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useLogin = () => {
    const loading = ref(false)
    const { showToast } = useCustomToast()

    const login = async (payload: { email: string; password: string }) => {
        loading.value = true
        try {
            const res = await auth_api.login(payload) as any
            // Handle token storage if not handled in axios interceptor or auth state
            showToast({ title: "Success", message: "Login successful", toastType: "success" })
            return res
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Login failed", toastType: "error" })
            return null
        } finally {
            loading.value = false
        }
    }

    return { loading, login }
}
