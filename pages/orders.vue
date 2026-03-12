<template>
  <div class="min-h-screen pb-12">
    <definePageMeta :layout="'dashboard'" />
    
    <!-- Hero Section -->
    <div class="mb-8 relative p-10 rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 shadow-md shadow-black/5 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-black text-white mb-2 tracking-tight">Order Management</h1>
        <p class="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">Track and monitor all orders referred through your merchant network.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div v-for="(stat, idx) in orderStats" :key="idx" 
           class="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group relative overflow-hidden">
        <div class="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-emerald-500 opacity-[0.03] transition-transform group-hover:scale-150"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center transition-all group-hover:bg-emerald-100 group-hover:rotate-12">
              <Icon :name="stat.icon" class="w-6 h-6 text-emerald-600" />
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{{ stat.label }}</span>
          </div>
          <div class="text-3xl font-black text-gray-900 mb-1 tracking-tight">{{ stat.value }}</div>
          <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Updated just now</div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white overflow-hidden border border-gray-100 shadow-sm rounded-[2.5rem]">
      <div class="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-black text-gray-900 mb-1 tracking-tight">Recent Transactions</h2>
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total of {{ total }} referred orders</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="fetchOrders()" class="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all">
            <Icon name="lucide:refresh-cw" class="w-5 h-5" :class="{ 'animate-spin': loading }" />
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Order ID</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Customer</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Amount</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Status</th>
              <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="5" class="px-8 py-20 text-center">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative w-10 h-10">
                    <div class="absolute inset-0 border-4 border-emerald-500/10 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
                  </div>
                  <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processing referral data...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="orders.length === 0">
              <td colspan="5" class="px-8 py-20 text-center">
                <div class="max-w-xs mx-auto flex flex-col items-center gap-4">
                  <div class="p-5 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm">
                    <Icon name="lucide:shopping-bag" class="w-10 h-10 text-gray-200" />
                  </div>
                  <div>
                    <h3 class="text-sm font-black text-gray-900 mb-1 tracking-tight">No Orders Found</h3>
                    <p class="text-xs text-gray-400 font-medium">Share your referral link to start tracking orders and earning commissions.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-for="order in orders" :key="order._id" v-else class="hover:bg-gray-50/50 transition-colors group cursor-default">
              <td class="px-8 py-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 text-[10px] font-black text-gray-400 group-hover:border-emerald-500/20 group-hover:text-emerald-600 transition-all">
                    #{{ order.orderNumber.split('-').pop() }}
                  </div>
                  <span class="text-sm font-black text-gray-900 group-hover:text-emerald-600 transition-colors">{{ order.orderNumber }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-black opacity-80 group-hover:opacity-100 transition-opacity">
                    {{ order.customerId?.fullName?.charAt(0) || 'C' }}
                  </div>
                  <span class="text-sm font-bold text-gray-600">{{ order.customerId?.fullName || 'Anonymous' }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="text-sm font-black text-gray-900 tracking-tight">₦{{ (order.totalAmount || 0).toLocaleString() }}</div>
                <div class="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Inc. shipping</div>
              </td>
              <td class="px-8 py-6">
                <span :class="getStatusBadgeClass(order.status)" class="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-8 py-6 text-right">
                <div class="text-sm font-black text-gray-900">{{ new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) }}</div>
                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{{ new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchOrders } from '@/composables/modules/orders/useFetchOrders'

definePageMeta({ layout: 'dashboard' })

const { orders, loading, total, fetchOrders } = useFetchOrders()

const orderStats = computed(() => [
  { label: 'Referred Items', value: total.value, icon: 'lucide:package-2', color: 'from-blue-500 to-cyan-500' },
  { label: 'Pending Delivery', value: orders.value.filter(o => o.status === 'pending').length, icon: 'lucide:truck', color: 'from-amber-500 to-orange-500' },
  { label: 'Success Rate', value: '98.5%', icon: 'lucide:trending-up', color: 'from-emerald-500 to-teal-500' }
])

interface Order {
  _id: string;
  orderNumber: string;
  customerId: { fullName: string; email: string };
  totalAmount: number;
  status: string;
  createdAt: string;
}

const getStatusBadgeClass = (status: string) => {
  const s = status.toLowerCase()
  if (s === 'delivered' || s === 'completed') return 'bg-emerald-500/20 text-emerald-400'
  if (s === 'pending' || s === 'processing') return 'bg-amber-500/20 text-amber-400'
  if (s === 'cancelled' || s === 'failed') return 'bg-rose-500/20 text-rose-400'
  return 'bg-dark-700 text-dark-300'
}

onMounted(() => fetchOrders({ limit: 50 }))
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}

.anim-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
}
</style>
