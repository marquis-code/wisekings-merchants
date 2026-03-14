<template>
  <div class="space-y-8 pb-12">
    <!-- Header Section -->
    <div class="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-8 border border-white/5 shadow-md shadow-black/5 group">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl opacity-60 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
        <div>
          <h1 class="text-3xl font-black text-white tracking-tight">Financial Wallet</h1>
          <p class="text-sm text-gray-400 font-medium">Manage your earnings and withdrawal requests</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="showFundModal = true" class="px-6 py-3 bg-white text-gray-900 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all flex items-center gap-2">
            <Icon name="lucide:plus" class="w-5 h-5" />
            Fund Wallet
          </button>
          <button @click="handleFetchData" class="p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
            <Icon name="lucide:refresh-cw" :class="['w-5 h-5', loading ? 'animate-spin' : '']" />
          </button>
        </div>
      </div>
    </div>

    <!-- Balance Cards Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Premium Balance Card -->
      <div class="lg:col-span-2 relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-md shadow-black/5 group border border-white/5">
        <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-x-1/4 translate-y-1/2 blur-2xl"></div>
        
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <p class="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] px-1">Available Balance</p>
              <h2 class="text-5xl font-black tracking-tighter">₦{{ (wallet?.availableBalance || wallet?.balance || 0).toLocaleString() }}</h2>
            </div>
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <Icon name="lucide:wallet" class="w-7 h-7 text-emerald-400" />
            </div>
          </div>
          
          <div class="flex items-end justify-between">
            <div class="flex items-center gap-8">
              <div>
                <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Earned</p>
                <p class="text-lg font-black text-white">₦{{ (wallet?.totalEarned || 0).toLocaleString() }}</p>
              </div>
              <div class="w-px h-8 bg-white/10"></div>
              <div>
                <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">Withdrawn</p>
                <p class="text-lg font-black text-white">₦{{ (wallet?.totalWithdrawn || 0).toLocaleString() }}</p>
              </div>
            </div>
            <div class="flex -space-x-3 opacity-30">
              <div class="w-10 h-10 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
              <div class="w-10 h-10 rounded-full bg-teal-500 border-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Card -->
      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-500">
        <div>
          <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-100 group-hover:rotate-12 transition-all">
            <Icon name="lucide:clock" class="w-6 h-6" />
          </div>
          <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Pending Clearance</p>
          <h3 class="text-3xl font-black text-gray-900 tracking-tight">₦{{ (wallet?.pendingBalance || 0).toLocaleString() }}</h3>
          <p class="text-gray-400 text-xs mt-3 font-medium">Funds being processed from recent referrals</p>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-50">
          <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
            <span class="text-gray-400">STATUS</span>
            <span class="text-amber-600 flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100/50">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              PROCESSING
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions & History Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <!-- Withdrawal Request Form -->
      <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-xl font-black text-gray-900 tracking-tight">Request Payout</h2>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Transfer funds to your bank account</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform hover:scale-110 hover:rotate-12 cursor-pointer">
            <Icon name="lucide:arrow-up-right" class="w-6 h-6" />
          </div>
        </div>

        <form @submit.prevent="handleRequestWithdrawal" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="md:col-span-2 space-y-3">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Amount to Withdraw (₦)</label>
              <div class="relative group">
                <span class="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400 transition-colors group-focus-within:text-emerald-500">₦</span>
                <input v-model.number="withdrawForm.amount" type="number" min="10000" class="w-full bg-gray-50 border border-transparent rounded-[1.5rem] pl-12 pr-6 py-5 text-lg font-black text-gray-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all placeholder:text-gray-300" required placeholder="0.00" />
              </div>
              <div class="flex items-center gap-2 px-1">
                <div class="w-1 h-1 rounded-full bg-emerald-500"></div>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Min. withdrawal: ₦10,000.00</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Bank Name</label>
              <input v-model="withdrawForm.bankDetails.bankName" type="text" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black text-gray-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all placeholder:text-gray-300" required placeholder="e.g. GTBank" />
            </div>
            
            <div class="space-y-3">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Account Number</label>
              <input v-model="withdrawForm.bankDetails.accountNumber" type="text" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black text-gray-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all placeholder:text-gray-300" required placeholder="0123456789" />
            </div>
            
            <div class="md:col-span-2 space-y-3">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Beneficiary Name</label>
              <input v-model="withdrawForm.bankDetails.accountName" type="text" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black text-gray-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500/30 transition-all placeholder:text-gray-300" required placeholder="AS APPEARS ON BANK" />
            </div>
          </div>

          <button type="submit" class="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-900/10 flex items-center justify-center gap-3 active:scale-[0.98] group" :disabled="submitting">
            <Icon :name="submitting ? 'lucide:loader-2' : 'lucide:send-horizontal'" :class="['w-5 h-5 transition-transform group-hover:translate-x-1', submitting ? 'animate-spin' : '']" />
            {{ submitting ? 'Processing Request...' : 'Confirm Payout Request' }}
          </button>
        </form>
      </div>

      <!-- Withdrawal History -->
      <div class="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-xl font-black text-gray-900 tracking-tight">Recent Payouts</h2>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tracking your financial history</p>
          </div>
          <button class="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline px-3 py-1 bg-emerald-50 rounded-lg">View All</button>
        </div>

        <div v-if="historyLoading" class="flex-1 flex items-center justify-center py-20">
          <Icon name="lucide:loader-2" class="w-10 h-10 text-emerald-500 animate-spin" />
        </div>
        
        <div v-else-if="withdrawals.length === 0" class="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50/30 rounded-[2rem] border-2 border-dashed border-gray-100">
          <div class="w-20 h-20 rounded-[2rem] bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Icon name="lucide:receipt" class="w-10 h-10 text-gray-200" />
          </div>
          <p class="text-sm font-black text-gray-900 tracking-tight">No payout history yet</p>
          <p class="text-xs text-gray-400 mt-1 font-medium">Your approved withdrawals will appear here</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="w in withdrawals" :key="w._id" class="group flex items-center justify-between p-5 bg-gray-50/30 hover:bg-white rounded-[1.5rem] border border-transparent hover:border-gray-100 transition-all">
            <div class="flex items-center gap-5">
              <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-all group-hover:scale-110 group-hover:rotate-6',
                w.status === 'paid' ? 'bg-emerald-500' : w.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500']">
                <Icon :name="w.status === 'paid' ? 'lucide:check-circle' : w.status === 'rejected' ? 'lucide:x-circle' : 'lucide:clock'" class="w-7 h-7" />
              </div>
              <div>
                <p class="text-lg font-black text-gray-900 tracking-tight">₦{{ (w.amount || 0).toLocaleString() }}</p>
                <p class="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{{ new Date(w.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1.5">
              <span :class="['px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border',
                w.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                w.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                'bg-amber-50 text-amber-600 border-amber-100/50']">
                {{ w.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Funding Modal -->
    <div v-if="showFundModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showFundModal = false"></div>
      <div class="relative bg-white rounded-[2.5rem] w-full max-w-lg p-10 overflow-hidden shadow-2xl">
        <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <div class="flex items-center justify-between mb-8">
           <h2 class="text-2xl font-black text-gray-900 tracking-tight">Fund Wallet</h2>
           <button @click="showFundModal = false" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all">
              <Icon name="lucide:x" size="20" />
           </button>
        </div>

        <div class="space-y-6">
          <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
             <div class="flex items-center justify-between">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bank Name</p>
                <p class="text-xs font-black text-gray-900">{{ globalSettings?.merchantBankDetails?.bankName || '...' }}</p>
             </div>
             <div class="flex items-center justify-between">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Number</p>
                <p class="text-xs font-black text-gray-900 select-all">{{ globalSettings?.merchantBankDetails?.accountNumber || '...' }}</p>
             </div>
             <div class="flex items-center justify-between">
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account Name</p>
                <p class="text-xs font-black text-gray-900">{{ globalSettings?.merchantBankDetails?.accountName || '...' }}</p>
             </div>
          </div>

          <div class="space-y-4">
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Amount to Fund (₦)</label>
            <input v-model.number="fundForm.amount" type="number" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-black text-gray-900 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all" placeholder="Enter amount..." />
          </div>

          <div class="space-y-4">
             <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Proof of Payment</label>
             <div class="relative h-32 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 transition-all group overflow-hidden" @click="triggerFileInput">
                <template v-if="!fundForm.proofUrl">
                   <Icon :name="uploading ? 'lucide:loader-2' : 'lucide:camera'" :class="['w-6 h-6 text-gray-300', uploading ? 'animate-spin' : '']" />
                   <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ uploading ? 'Uploading...' : 'Upload Receipt' }}</p>
                </template>
                <template v-else>
                   <img :src="fundForm.proofUrl" class="absolute inset-0 w-full h-full object-cover opacity-20" />
                   <Icon name="lucide:check-circle" class="w-8 h-8 text-emerald-500" />
                   <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Receipt Uploaded</p>
                </template>
                <input ref="fundFileInput" type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
             </div>
          </div>

          <button @click="handleFundWallet" class="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50" :disabled="funding || !fundForm.proofUrl || !fundForm.amount">
             <Icon :name="funding ? 'lucide:loader-2' : 'lucide:check'" :class="['w-5 h-5', funding ? 'animate-spin' : '']" />
             {{ funding ? 'Submitting Request...' : 'I Have Made Payment' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState'
import { useFetchWallet } from '@/composables/modules/wallets/useFetchWallet'
import { useFetchWithdrawals } from '@/composables/modules/wallets/useFetchWithdrawals'
import { useRequestWithdrawal } from '@/composables/modules/wallets/useRequestWithdrawal'
import { useFundWallet } from '@/composables/modules/wallets/useFundWallet'
import { useConfirm } from '@/composables/core/useConfirm'
import { GATEWAY_ENDPOINT } from '@/api_factory/axios.config'

definePageMeta({ layout: 'dashboard' })

const { wallet, fetchWallet, loading: walletLoading } = useFetchWallet()
const { withdrawals, fetchWithdrawals, loading: historyLoading } = useFetchWithdrawals()
const { loading: submitting, requestWithdrawal: submitWithdrawal } = useRequestWithdrawal()
const { loading: funding, fundWallet } = useFundWallet()
const { openConfirm } = useConfirm()

const { user } = useAuthState()

const showFundModal = ref(false)
const uploading = ref(false)
const globalSettings = ref<any>(null)
const fundForm = ref({ amount: 0, proofUrl: '' })
const fundFileInput = ref<HTMLInputElement | null>(null)

const whatsappNumber = ref('')

function triggerFileInput() {
  fundFileInput.value?.click()
}

function handleWhatsAppFunding(amount: number) {
  const message = encodeURIComponent(
    `*WALLET FUNDING REQUEST*\n\n` +
    `*Merchant:* ${user.value?.fullName || 'Merchant'}\n` +
    `*Amount:* ₦${amount.toLocaleString()}\n` +
    `*Method:* DIRECT BANK TRANSFER\n\n` +
    `Please verify my payment proof in the admin dashboard.`
  )
  window.open(`https://wa.me/${whatsappNumber.value}?text=${message}`, '_blank')
}

const loading = computed(() => walletLoading.value || historyLoading.value || uploading.value)

const withdrawForm = ref({
  amount: 0,
  bankDetails: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  }
})

async function handleRequestWithdrawal() {
  if (await openConfirm({
    title: 'Request Withdrawal',
    message: `Confirm payout of ₦${withdrawForm.value.amount.toLocaleString()}? This will be transferred to your ${withdrawForm.value.bankDetails.bankName} account.`,
    confirmText: 'Confirm & Submit',
    cancelText: 'Edit Details',
    confirmClass: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/10',
    icon: 'lucide:banknote'
  })) {
    const success = await submitWithdrawal(withdrawForm.value)
    if (success) {
      withdrawForm.value.amount = 0
      await handleFetchData()
    }
  }
}

async function handleFetchData() {
  await Promise.allSettled([
    fetchWallet(),
    fetchWithdrawals()
  ])
  
  // Fetch settings for bank details
  try {
     const res = await GATEWAY_ENDPOINT.get('/settings') as any
     const data = res.data || res.data?.data || res
     globalSettings.value = data
     whatsappNumber.value = data.whatsappNumber || ''
  } catch (e) {
     console.error('Failed to load settings', e)
  }
}

async function handleFileUpload(event: any) {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await GATEWAY_ENDPOINT.post('/uploads/image/payment_proofs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }) as any
    fundForm.value.proofUrl = res.data?.url || res.url
  } catch (e) {
    console.error('Upload failed', e)
  } finally {
    uploading.value = false
  }
}

async function handleFundWallet() {
   const success = await fundWallet(fundForm.value)
   if (success) {
      handleWhatsAppFunding(fundForm.value.amount)
      showFundModal.value = false
      fundForm.value = { amount: 0, proofUrl: '' }
      handleFetchData()
   }
}

onMounted(handleFetchData)
</script>
