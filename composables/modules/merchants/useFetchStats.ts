import { ref } from "vue"
import { merchants_api } from "@/api_factory/modules/merchants"
import { useCustomToast } from "@/composables/core/useCustomToast"

export const useFetchStats = () => {
    const loading = ref(false)
    const stats = ref<any>(null)
    const { showToast } = useCustomToast()

    const fetchStats = async () => {
        loading.value = true
        try {
            const res = await merchants_api.getDashboard() as any
            stats.value = res.data?.stats || res.stats || res.data || res
        } catch (err: any) {
            showToast({ title: "Error", message: err.message || "Failed to fetch stats", toastType: "error" })
        } finally {
            loading.value = false
        }
    }

    return { loading, stats, fetchStats }
}
