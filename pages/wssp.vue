<template>
    <div class="space-y-6 md:space-y-10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-1">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full mb-2">
                    <Icon name="lucide:star" class="text-amber-500" size="14" />
                    <span class="text-[10px] font-black uppercase tracking-widest text-amber-700">Store Support Coordinator</span>
                </div>
                <h1 class="text-3xl font-black text-[#033958] tracking-tight">WSSP Portal</h1>
                <p class="text-sm font-medium text-[#033958]/60 max-w-xl">Claim wholesale invoices and track their payment statuses to earn dynamic commissions based on prompt invoice settlement.</p>
            </div>
            
            <button @click="showClaimModal = true" class="inline-flex items-center gap-2 bg-[#033958] hover:bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#033958]/20 group">
                <Icon name="lucide:plus" class="group-hover:rotate-90 transition-transform duration-300" />
                Claim Invoice
            </button>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div class="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                    <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                        <Icon name="lucide:check-circle" size="20" />
                    </div>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Claims</p>
                    <p class="text-2xl font-black text-[#033958]">{{ stats.totalClaims }}</p>
                </div>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                <div class="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                    <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                        <Icon name="lucide:clock" size="20" />
                    </div>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Pending Invoices</p>
                    <p class="text-2xl font-black text-[#033958]">{{ stats.pendingInvoices }}</p>
                </div>
            </div>

            <div class="bg-[#033958] p-6 rounded-3xl border border-[#033958] shadow-lg shadow-[#033958]/20 relative overflow-hidden group">
                <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                    <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                        <Icon name="lucide:wallet" size="20" />
                    </div>
                    <p class="text-xs font-black text-white/60 uppercase tracking-widest mb-1">Est. Commission</p>
                    <p class="text-2xl font-black text-white">₦ {{ stats.estCommission.toLocaleString() }}</p>
                </div>
            </div>
        </div>

        <!-- Invoices Matrix -->
        <div class="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div class="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-base font-black text-[#033958] tracking-tight uppercase">Recent Validations</h2>
            </div>
            
            <div class="p-6 md:p-8 flex-1">
                <div v-if="loading" class="space-y-4">
                    <div v-for="i in 3" :key="i" class="h-20 bg-gray-50 rounded-2xl animate-pulse"></div>
                </div>
                
                <div v-else-if="invoices.length === 0" class="text-center py-12">
                    <div class="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-4">
                        <Icon name="lucide:file-search" size="32" />
                    </div>
                    <p class="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">No Invoices Claimed</p>
                    <p class="text-xs text-gray-500 max-w-sm mx-auto">Start claiming new goods arriving at your store by entering their Waybill or Invoice Number.</p>
                </div>

                <div v-else class="space-y-4">
                    <div v-for="invoice in invoices" :key="invoice._id" class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border transition-all hover:shadow-md" :class="invoice.paymentStatus === 'paid' ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-gray-100 hover:border-[#033958]/20'">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="invoice.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'">
                                <Icon :name="invoice.paymentStatus === 'paid' ? 'lucide:check-square' : 'lucide:clock'" size="24" />
                            </div>
                            <div>
                                <h3 class="text-sm font-black text-[#033958]">{{ invoice.orderNumber }}</h3>
                                <p class="text-xs font-medium text-gray-500 mt-0.5">Value: ₦{{ invoice.totalAmount.toLocaleString() }}</p>
                                <p class="text-[10px] uppercase tracking-widest text-[#033958]/40 mt-1 font-bold">{{ new Date(invoice.createdAt).toLocaleDateString() }}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-6">
                            <div v-if="invoice.paymentStatus !== 'paid'" class="text-right">
                                <p class="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Time Elapsed</p>
                                <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">
                                    <Icon name="lucide:timer" size="14" />
                                    {{ getDaysElapsed(invoice.createdAt) }} Days
                                </div>
                            </div>
                            <div v-else class="text-right">
                                <p class="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">Commission Earned</p>
                                <p class="text-sm font-black text-emerald-700">₦ {{ (invoice.totalAmount * getRate(getDaysElapsed(invoice.createdAt, invoice.updatedAt)) / 100).toLocaleString() }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Claim Modal -->
        <CoreModal :isOpen="showClaimModal" @close="showClaimModal = false">
            <div class="p-8">
                <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon name="lucide:scan-barcode" size="24" />
                </div>
                <h3 class="text-xl font-black text-[#033958] tracking-tight mb-2">Claim Delivery</h3>
                <p class="text-sm text-gray-500 mb-6">Enter the Invoice details exactly as printed on the delivery package to claim it and attach your commission.</p>

                <form @submit.prevent="submitClaim">
                    <CoreAnimatedInput v-model="claimForm.orderNumber" label="Invoice/Waybill Number" placeholder="e.g. WK-17032..." required />
                    
                    <button type="submit" :disabled="claiming" class="w-full mt-8 bg-[#033958] hover:bg-gray-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                        <span v-if="!claiming">Attach to Coordinator</span>
                        <Icon v-else name="lucide:loader-2" class="animate-spin" />
                    </button>
                </form>
            </div>
        </CoreModal>
    </div>
</template>

<script setup lang="ts">
import { GATEWAY_ENDPOINT } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

definePageMeta({
    layout: 'dashboard'
})

const { showToast } = useCustomToast()
const loading = ref(true)
const claiming = ref(false)
const showClaimModal = ref(false)
const claimForm = ref({ orderNumber: '' })

const invoices = ref<any[]>([])
const stats = ref({
    totalClaims: 0,
    pendingInvoices: 0,
    estCommission: 0
})

const getDaysElapsed = (start: string, end?: string) => {
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : new Date()
    return Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
}

const getRate = (daysDiff: number) => {
    if (daysDiff <= 7) return 1.00;
    if (daysDiff <= 14) return 0.75;
    if (daysDiff <= 21) return 0.50;
    return 0.25;
}

const fetchClaims = async () => {
    loading.value = true
    try {
        const res = await GATEWAY_ENDPOINT.get('/orders/me')
        const data = res.data?.data || res.data
        // We filter locally just in case, though the backend returns claims tied to user profile
        invoices.value = data?.data || []
        
        stats.value.totalClaims = invoices.value.length
        stats.value.pendingInvoices = invoices.value.filter((i: any) => i.paymentStatus !== 'paid').length
        stats.value.estCommission = invoices.value.filter((i: any) => i.paymentStatus !== 'paid').reduce((sum: number, inv: any) => {
            return sum + (inv.totalAmount * getRate(getDaysElapsed(inv.createdAt)) / 100)
        }, 0)
    } catch (e: any) {
        showToast({ title: 'Fetch Error', message: 'Could not load your claimed invoices', toastType: 'error' })
    } finally {
        loading.value = false
    }
}

const submitClaim = async () => {
    if (!claimForm.value.orderNumber) return
    claiming.value = true
    try {
        await GATEWAY_ENDPOINT.post('/orders/claim-invoice', { orderNumber: claimForm.value.orderNumber })
        showToast({ title: 'Success', message: 'Invoice claimed and attached to you successfully!', toastType: 'success' })
        showClaimModal.value = false
        claimForm.value.orderNumber = ''
        fetchClaims()
    } catch (e: any) {
        showToast({ title: 'Claim Failed', message: e.response?.data?.message || 'Could not claim this invoice', toastType: 'error' })
    } finally {
        claiming.value = false
    }
}

onMounted(() => {
    fetchClaims()
})
</script>
