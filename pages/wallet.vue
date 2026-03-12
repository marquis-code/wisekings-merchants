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
  </div>
</template>

<script setup lang="ts">
import { useFetchWallet } from '@/composables/modules/wallets/useFetchWallet'
import { useFetchWithdrawals } from '@/composables/modules/wallets/useFetchWithdrawals'
import { useRequestWithdrawal } from '@/composables/modules/wallets/useRequestWithdrawal'
import { useConfirm } from '@/composables/core/useConfirm'

definePageMeta({ layout: 'dashboard' })

const { wallet, fetchWallet, loading: walletLoading } = useFetchWallet()
const { withdrawals, fetchWithdrawals, loading: historyLoading } = useFetchWithdrawals()
const { loading: submitting, requestWithdrawal: submitWithdrawal } = useRequestWithdrawal()
const { openConfirm } = useConfirm()

const loading = computed(() => walletLoading.value || historyLoading.value)

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
}

onMounted(handleFetchData)
</script>
