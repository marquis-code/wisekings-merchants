<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="s in statsCards" :key="s.label" class="stat-card">
        <div class="flex items-center justify-between">
          <span class="text-dark-400 text-sm">{{ s.label }}</span>
          <Icon :name="s.icon" :class="['w-5 h-5', s.iconColor]" />
        </div>
        <p class="text-2xl font-bold text-white">{{ s.value }}</p>
      </div>
    </div>
    <div class="card mb-6">
      <h2 class="text-lg font-semibold text-white mb-3">Referral Link</h2>
      <div class="flex items-center gap-2">
        <input :value="profile?.referralLink" readonly class="input flex-1" />
        <button @click="copy" class="btn-secondary btn-sm"><Icon name="lucide:copy" class="w-4 h-4" /> Copy</button>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-4">Recent Orders</h2>
        <div v-if="orders.length === 0" class="text-center py-8 text-dark-400">No orders yet</div>
        <div v-for="o in orders" :key="o._id" class="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0">
          <div><p class="text-sm font-medium text-dark-200">{{ o.orderNumber }}</p><p class="text-xs text-dark-400">₦{{ o.totalAmount?.toLocaleString() }}</p></div>
          <span :class="o.status === 'delivered' ? 'badge-success' : 'badge-warning'">{{ o.status }}</span>
        </div>
      </div>
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-4">Recent Commissions</h2>
        <div v-if="commissions.length === 0" class="text-center py-8 text-dark-400">No commissions yet</div>
        <div v-for="c in commissions" :key="c._id" class="flex items-center justify-between py-2 border-b border-dark-700/50 last:border-0">
          <p class="text-sm font-medium text-dark-200">₦{{ c.amount?.toLocaleString() }}</p>
          <span :class="c.status === 'paid' ? 'badge-success' : 'badge-warning'">{{ c.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchProfile } from '@/composables/modules/merchants/useFetchProfile'
import { useFetchStats } from '@/composables/modules/merchants/useFetchStats'
import { useFetchOrders } from '@/composables/modules/orders/useFetchOrders'
import { useFetchCommissions } from '@/composables/modules/commissions/useFetchCommissions'

definePageMeta({ layout: 'dashboard' })

const { profile, fetchProfile } = useFetchProfile()
const { stats, fetchStats } = useFetchStats()
const { orders, fetchOrders } = useFetchOrders()
const { commissions, fetchCommissions } = useFetchCommissions()

const toast = useToast()

const statsCards = computed(() => [
  { label: 'Total Sales', value: `₦${((stats.value?.totalSalesValue || 0) / 1000).toFixed(0)}k`, icon: 'lucide:trending-up', iconColor: 'text-emerald-400' },
  { label: 'This Month', value: `₦${((stats.value?.monthlySalesValue || 0) / 1000).toFixed(0)}k`, icon: 'lucide:calendar', iconColor: 'text-blue-400' },
  { label: 'Orders Referred', value: stats.value?.totalOrdersReferred || 0, icon: 'lucide:shopping-cart', iconColor: 'text-purple-400' },
  { label: 'Commission Rate', value: `${profile.value?.commissionRate || 0}%`, icon: 'lucide:percent', iconColor: 'text-amber-400' },
])

function copy() {
  if (profile.value?.referralLink) {
    navigator.clipboard.writeText(profile.value.referralLink)
    toast.success('Copied!')
  }
}

onMounted(async () => {
  await Promise.allSettled([
    fetchProfile(),
    fetchStats(),
    fetchOrders({ limit: 5 }),
    fetchCommissions({ limit: 5 })
  ])
})
</script>
