<template>
  <div class="space-y-10 pb-12">
    <!-- KYC Alert Banner -->
    <div v-if="profile?.kyc?.status !== 'approved' && profile?.kyc?.status !== 'pending'" 
      class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group mb-10">
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div class="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
            <Icon name="lucide:shield-alert" class="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 class="text-2xl font-black mb-2 tracking-tight">KYC Verification Required</h2>
            <p v-if="profile?.kyc?.status === 'rejected'" class="text-white font-bold mb-1">Reason: {{ profile?.kyc?.rejectionReason }}</p>
            <p class="text-white/80 text-base max-w-xl leading-relaxed">Please complete your identity verification to start sharing your products and earning commissions.</p>
          </div>
        </div>
        <NuxtLink to="/kyc" class="shrink-0 bg-white text-orange-600 px-10 py-4 rounded-2xl font-black hover:bg-orange-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 group/btn">
          Verify Identity
          <Icon name="lucide:shield-check" class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>

    <!-- Welcome Banner/Hero -->
    <div class="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-10 border border-white/5 shadow-md shadow-black/5 group">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl opacity-60 group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full -translate-x-1/4 translate-y-1/2 blur-3xl opacity-50"></div>
      
      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
        <div class="text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Account Dashboard
          </div>
          <h1 class="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Hello, {{ user?.fullName?.split(' ')[0] || 'Merchant' }}!
          </h1>
          <p class="text-gray-400 font-medium max-w-lg leading-relaxed">
            Your business performance at a glance. You've earned commissions on <span class="text-emerald-400 font-bold">{{ dashboardData?.stats?.totalOrdersReferred || 0 }} successful referrals</span> so far.
          </p>
        </div>

        <div v-if="dashboardData?.merchant" class="flex items-stretch gap-6 h-fit">
          <NuxtLink to="/shelf-check" class="bg-amber-500 text-white rounded-3xl p-6 shadow-lg shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all group flex flex-col justify-between">
            <p class="text-[9px] font-bold text-amber-100 uppercase tracking-[0.2em] mb-1">Stock Check</p>
            <p class="text-xl font-black tracking-tight capitalize">Shelf Status</p>
            <div class="mt-4 flex items-center gap-2">
              <Icon name="lucide:camera" class="w-5 h-5 text-amber-100 group-hover:rotate-12 transition-transform" />
              <span class="text-[10px] font-bold text-white tracking-wide uppercase">Report Now</span>
            </div>
          </NuxtLink>
          <div class="bg-white/5 rounded-3xl p-6 border border-white/10 group hover:bg-white/10 transition-all duration-500">
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Merchant Identity</p>
            <p class="text-xl font-black text-white tracking-wider">{{ dashboardData.merchant.merchantCode }}</p>
            <div class="mt-4 flex items-center gap-2">
              <Icon name="lucide:qr-code" class="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" />
              <span class="text-[10px] font-bold text-gray-500">Scan Code</span>
            </div>
          </div>
          <div class="bg-emerald-500 text-white rounded-3xl p-6 shadow-lg shadow-emerald-500/10 hidden sm:block">
            <p class="text-[9px] font-bold text-emerald-100 uppercase tracking-[0.2em] mb-1">Current Tier</p>
            <p class="text-xl font-black tracking-tight capitalize">{{ dashboardData.merchant.category || 'Standard' }}</p>
            <div class="mt-4 flex items-center gap-1.5">
              <Icon name="lucide:star" class="w-4 h-4 text-emerald-100" />
              <span class="text-[10px] font-bold text-white tracking-wide uppercase">{{ dashboardData.merchant.rank || profile.rank || 'Starter' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="s in statsCards" :key="s.label"
        class="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 group cursor-default relative overflow-hidden">
        <div class="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-emerald-500 opacity-[0.03] transition-transform group-hover:scale-150"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center transition-all group-hover:bg-emerald-100 group-hover:rotate-12">
              <Icon :name="s.icon" class="w-6 h-6 px-1 lg:px-0 text-emerald-600" />
            </div>
          </div>
          <p class="text-3xl font-black text-gray-900 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">{{ s.value }}</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{{ s.label }}</span>
            <span class="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <Icon name="lucide:arrow-up-right" class="w-3 h-3" />
              +{{ Math.floor(Math.random() * 5) + 2 }}%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Referral Link Premium Card -->
    <div class="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-md shadow-black/5 group border border-white/5">
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-x-1/4 translate-y-1/2 blur-2xl"></div>
      
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <Icon name="lucide:zap" class="w-5 h-5 fill-emerald-400" />
            </div>
            <h2 class="text-2xl font-black tracking-tight">Accelerate Your Earnings</h2>
          </div>
          <p class="text-gray-400 font-medium mb-8 max-w-xl">
            Copy and share your unique referral link. You earn a <span class="text-white font-bold">{{ dashboardData?.merchant?.commissionRate || 3 }}% commission</span> on every purchase made through this link.
          </p>
          
          <div class="flex flex-col sm:flex-row items-stretch gap-3">
            <div class="relative flex-1 group/input">
              <input
                :value="profile?.referralLink || dashboardData?.merchant?.referralLink || 'Processing...'"
                readonly
                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all group-hover/input:bg-white/10"
              />
              <div class="absolute right-4 top-1/2 -translate-y-1/2">
                <Icon name="lucide:link-2" class="w-4 h-4 text-white/20" />
              </div>
            </div>
            <button @click="copyLink"
              class="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 active:scale-95">
              <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
              {{ copied ? 'Link Copied!' : 'Copy Link' }}
            </button>
          </div>
        </div>
        
        <div class="hidden lg:flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 text-center">
          <div class="bg-white rounded-3xl p-3 mb-4 shadow-sm border border-emerald-500/20 w-40 h-40 flex items-center justify-center overflow-hidden">
            <template v-if="qrCode">
              <img :src="qrCode" alt="Referral QR" class="w-full h-full object-contain" />
            </template>
            <div v-else class="w-full h-full bg-gray-50 flex items-center justify-center">
               <Icon name="lucide:loader-2" class="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <p class="text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-loose">Digital Pass<br/><span class="text-emerald-400">{{ dashboardData?.merchant?.merchantCode }}</span></p>
            <div class="flex items-center gap-2 mt-2">
              <button @click="shareLink" class="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                <Icon name="lucide:share-2" class="w-3.5 h-3.5" />
                Share
              </button>
              <button @click="downloadQr" v-if="qrCode" class="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                <Icon name="lucide:download" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Tracker -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Order Stream -->
      <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight">Referral Traffic</h3>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Order Status</p>
          </div>
          <NuxtLink to="/orders" class="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all group/link">
            <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div v-if="ordersLoading" class="flex-1 flex items-center justify-center py-20">
          <div class="flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <p class="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Fetching Data</p>
          </div>
        </div>
        
        <div v-else-if="orders.length === 0" class="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
            <Icon name="lucide:package" class="w-8 h-8 text-gray-200" />
          </div>
          <p class="text-sm font-bold text-gray-500">No transactions recorded</p>
          <p class="text-xs text-gray-400 mt-1">Start sharing your link to see activity here</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="o in orders" :key="o._id"
            class="group/item flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-default overflow-hidden">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                <Icon name="lucide:shopping-bag" class="w-6 h-6" />
              </div>
              <div class="overflow-hidden">
                <p class="text-sm font-black text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{{ o.orderNumber || 'Order' }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-tight">₦{{ (o.totalAmount || 0).toLocaleString() }}</p>
                  <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                  <p class="text-[10px] text-gray-500 font-medium italic">{{ new Date(o.createdAt).toLocaleDateString() }}</p>
                </div>
              </div>
            </div>
            <span :class="['px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors', statusClass(o.status)]">{{ o.status || 'pending' }}</span>
          </div>
        </div>
      </div>

      <!-- Commission Table -->
      <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight">Earnings Flow</h3>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Recent Reward History</p>
          </div>
          <NuxtLink to="/commissions" class="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all group">
            <Icon name="lucide:layout-list" class="w-5 h-5 group-hover:scale-110 transition-transform" />
          </NuxtLink>
        </div>

        <div v-if="commissionsLoading" class="flex-1 flex items-center justify-center py-20">
          <div class="w-10 h-10 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
        
        <div v-else-if="commissions.length === 0" class="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
          <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm">
            <Icon name="lucide:activity" class="w-8 h-8 text-gray-200" />
          </div>
          <p class="text-sm font-bold text-gray-500">Wait list is empty</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="c in commissions" :key="c._id"
            class="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-default">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                <Icon name="lucide:award" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-black text-gray-900 tracking-tight">₦{{ (c.commissionAmount || c.amount || 0).toLocaleString() }}</p>
                <p class="text-[10px] text-emerald-600 font-bold tracking-widest uppercase px-1.5 py-0.5 bg-emerald-50 rounded-md inline-block mt-1">{{ c.commissionRate || 0 }}% rate</p>
              </div>
            </div>
            <div class="flex flex-col items-end gap-1.5">
              <span :class="['px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest',
                c.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                c.status === 'reversed' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                'bg-amber-50 text-amber-600 border border-amber-100']">{{ c.status || 'pending' }}</span>
              <p class="text-[9px] text-gray-300 font-bold tracking-tighter">{{ new Date(c.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
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
import { useCustomToast } from '@/composables/core/useCustomToast'
import { merchants_api } from '@/api_factory/modules/merchants'

definePageMeta({ layout: 'dashboard' })

const { user } = useAuthState()
const { profile, fetchProfile } = useFetchProfile()
const { stats: dashboardData, fetchStats: fetchDashboard } = useFetchStats()
const { orders, fetchOrders, loading: ordersLoading } = useFetchOrders()
const { commissions, fetchCommissions, loading: commissionsLoading } = useFetchCommissions()
const { showToast } = useCustomToast()

useSeoMeta({
  title: 'Merchant Dashboard | WiseKings Business',
  description: 'Manage your merchant operations, track referrals, and monitor your earnings flow in real-time.',
})

const copied = ref(false)
const qrCode = ref('')

async function fetchQrCode() {
  try {
    const res = await merchants_api.getReferralQr() as any
    qrCode.value = res.data
  } catch (err) {
    console.error('Failed to fetch QR', err)
  }
}

function downloadQr() {
  if (!qrCode.value) return
  const link = document.createElement('a')
  link.href = qrCode.value
  link.download = `wisekings-referral-${dashboardData.value?.merchant?.merchantCode || 'qr'}.png`
  link.click()
}

const statsCards = computed(() => [
  {
    label: 'Settled Sales',
    value: `₦${((dashboardData.value?.stats?.totalSalesValue || 0) / 1000).toFixed(1)}k`,
    icon: 'lucide:bar-chart-3',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Monthly Goal',
    value: `₦${((dashboardData.value?.stats?.monthlySalesValue || 0) / 1000).toFixed(1)}k`,
    icon: 'lucide:calendar-range',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Active Network',
    value: dashboardData.value?.stats?.totalOrdersReferred || 0,
    icon: 'lucide:users',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    label: 'Earning Multiplier',
    value: `${dashboardData.value?.merchant?.commissionRate || profile.value?.commissionRate || 3}x`,
    icon: 'lucide:rocket',
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
])

function statusClass(status: string) {
  const map: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    completed: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    delivered: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    processing: 'bg-blue-50 text-blue-600 border border-blue-100',
    shipped: 'bg-blue-50 text-blue-600 border border-blue-100',
    cancelled: 'bg-gray-50 text-gray-600 border border-gray-100',
    suspended: 'bg-rose-50 text-rose-600 border border-rose-100',
  }
  return map[status?.toLowerCase()] || 'bg-gray-50 text-gray-500 border border-gray-100'
}

function copyLink() {
  const link = profile.value?.referralLink || dashboardData.value?.merchant?.referralLink
  if (link && typeof navigator !== 'undefined') {
    navigator.clipboard.writeText(link)
    copied.value = true
    showToast({ title: 'Success', message: 'Referral link copied to clipboard!', toastType: 'success' })
    setTimeout(() => { copied.value = false }, 3000)
  }
}

async function shareLink() {
  const link = profile.value?.referralLink || dashboardData.value?.merchant?.referralLink
  if (!link) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Join WiseKings',
        text: 'Shop premium snacks and more on WiseKings using my referral link!',
        url: link,
      })
      showToast({ title: 'Success', message: 'Shared successfully!', toastType: 'success' })
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        showToast({ title: 'Error', message: 'Could not share link', toastType: 'error' })
      }
    }
  } else {
    copyLink()
    showToast({ title: 'Info', message: 'Share not supported, link copied to clipboard instead.', toastType: 'info' })
  }
}

onMounted(async () => {
  await Promise.allSettled([
    fetchProfile(),
    fetchDashboard(),
    fetchQrCode(),
    fetchOrders({ limit: 6 }),
    fetchCommissions({ limit: 6 }),
  ])
})
</script>
