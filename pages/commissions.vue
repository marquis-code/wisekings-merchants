<template>
  <div class="min-h-screen pb-12">
    
    <!-- Hero Section -->
    <div class="mb-8 relative p-10 rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 shadow-md shadow-black/5 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-white mb-2 tracking-tight">Commission Earnings</h1>
        <p class="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">Real-time breakdown of your performance-based earnings from successful referrals.</p>
      </div>
    </div>

    <!-- Earnings Summary Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div v-for="(stat, idx) in summaryStats" :key="idx" 
           class="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group relative overflow-hidden">
        <div class="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-emerald-500 opacity-[0.03] transition-transform group-hover:scale-150"></div>
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 rounded-2xl bg-emerald-50 flex items-center justify-center transition-all group-hover:bg-emerald-100 group-hover:rotate-12">
              <Icon :name="stat.icon" class="w-5 h-5 text-emerald-600" />
            </div>
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ stat.label }}</p>
          </div>
          <div class="text-2xl font-black text-gray-900 tracking-tight">₦{{ stat.value.toLocaleString() }}</div>
          <div class="mt-2 flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest italic">Live Tracking</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Commissions Table -->
    <div class="bg-white overflow-hidden border border-gray-100 shadow-sm rounded-[2.5rem]">
      <div class="p-8 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-black text-gray-900 tracking-tight">Reward History</h2>
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Chronological list of earned incentives</p>
        </div>
        <button @click="fetchCommissions()" class="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all hover:rotate-180 duration-500">
          <Icon name="lucide:refresh-ccw" class="w-5 h-5" :class="{ 'animate-spin': loading }" />
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Source Order</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Earnings</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center">Incentive Rate</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Approval Status</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Settled On</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="5" class="px-8 py-24 text-center">
                <div class="flex flex-col items-center gap-6">
                  <div class="relative w-12 h-12">
                    <div class="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
                  </div>
                  <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Retrieving earnings ledger...</p>
                </div>
              </td>
            </tr>
            <tr v-else-if="items.length === 0">
              <td colspan="5" class="px-8 py-24 text-center">
                <div class="max-w-xs mx-auto flex flex-col items-center gap-6">
                  <div class="w-16 h-16 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
                    <Icon name="lucide:coins" class="w-8 h-8 text-gray-200" />
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">No Earnings Yet</h3>
                    <p class="text-xs text-gray-400 font-medium text-balance">Earn commissions by referring customers to the store.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="comm in items" :key="comm._id" v-else class="hover:bg-gray-50/50 transition-colors group">
              <td class="px-8 py-7">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all group-hover:scale-110">
                    <Icon name="lucide:hash" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-sm font-black text-gray-900 block tracking-tight">{{ typeof comm.orderId === 'object' ? (comm.orderId as any)?.orderNumber : comm.orderId }}</span>
                    <span v-if="comm.facilityMerchantId" class="text-[9px] text-amber-600 font-black uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1 w-fit mt-1">
                        <Icon name="lucide:star" class="w-2.5 h-2.5" />
                        Facilitation Incentive
                    </span>
                    <span v-else class="text-[9px] text-emerald-600 font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1 w-fit mt-1">
                        <Icon name="lucide:user" class="w-2.5 h-2.5" />
                        Standard Referral
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-8 py-7">
                <div class="inline-flex items-center px-4 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span class="text-sm font-black text-emerald-600 tracking-tight">₦{{ (comm.commissionAmount || 0).toLocaleString() }}</span>
                </div>
              </td>
              <td class="px-8 py-7 text-center">
                <span class="text-[10px] font-black text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-widest italic">{{ comm.commissionRate }}% rate</span>
              </td>
              <td class="px-8 py-7">
                <div class="flex items-center gap-2">
                  <div :class="comm.status === 'approved' ? 'bg-emerald-500' : 'bg-amber-500'" class="w-1.5 h-1.5 rounded-full"></div>
                  <span class="text-[9px] font-black uppercase tracking-widest" :class="comm.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'">
                    {{ comm.status }}
                  </span>
                </div>
              </td>
              <td class="px-8 py-7 text-right">
                <div class="text-sm font-black text-gray-900 tracking-tight">{{ new Date(comm.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}</div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ new Date(comm.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchCommissions } from '@/composables/modules/commissions/useFetchCommissions'

definePageMeta({ layout: 'dashboard' })

const { commissions: items, loading, total, fetchCommissions } = useFetchCommissions()

const summaryStats = computed(() => {
  const totalVal = items.value.reduce((acc, curr) => acc + (curr.commissionAmount || 0), 0)
  return [
    { label: 'Cumulative Earnings', value: totalVal, icon: 'lucide:wallet', color: 'from-emerald-500 to-teal-500' },
    { label: 'Pending Payouts', value: items.value.filter(c => c.status === 'pending').reduce((acc, curr) => acc + (curr.commissionAmount || 0), 0), icon: 'lucide:clock', color: 'from-amber-500 to-orange-500' },
    { label: 'Total Referrals', value: items.value.length, icon: 'lucide:users', color: 'from-blue-500 to-indigo-500' },
    { label: 'Avg. Reward Rate', value: items.value.length ? Math.round(items.value.reduce((acc, curr) => acc + (curr.commissionRate || 0), 0) / items.value.length) + '%' : '0%', icon: 'lucide:percent', color: 'from-rose-500 to-pink-500', isCurrency: false }
  ]
})

onMounted(() => fetchCommissions({ limit: 50 }))
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
}

.anim-pulse-slow {
  animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1) translate(0, 0); }
  50% { opacity: 0.3; transform: scale(1.1) translate(-20px, 20px); }
}
</style>
