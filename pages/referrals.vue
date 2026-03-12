<template>
  <div class="space-y-8 pb-12">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Referral Network</h1>
        <p class="text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">Track customers who joined using your unique link</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative hidden sm:block">
          <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search customers..." class="pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all" />
        </div>
        <button @click="fetchReferrals" class="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-600 transition-all">
          <Icon name="lucide:rotate-cw" :class="['w-5 h-5', loading ? 'animate-spin' : '']" />
        </button>
      </div>
    </div>

    <!-- Referral Stats Mini-Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Referrals</p>
        <p class="text-2xl font-black text-gray-900">{{ referrals.length }}</p>
      </div>
      <div class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Now</p>
        <p class="text-2xl font-black text-emerald-500">{{ referrals.filter(r => r.isActive).length }}</p>
      </div>
    </div>

    <!-- Referrals Table/List -->
    <div class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
      <div v-if="loading" class="flex-1 flex items-center justify-center py-24">
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p class="text-xs font-bold text-gray-400 tracking-widest uppercase">Syncing Network...</p>
        </div>
      </div>

      <div v-else-if="referrals.length === 0" class="flex-1 flex flex-col items-center justify-center py-24 px-6 text-center">
        <div class="relative mb-6">
          <div class="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-40 animate-pulse"></div>
          <div class="relative w-20 h-20 bg-emerald-50 border border-emerald-100/50 rounded-3xl flex items-center justify-center">
            <Icon name="lucide:user-plus" class="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Grow Your Network</h3>
        <p class="text-sm text-gray-500 max-w-xs mx-auto mb-8 font-medium italic">"The best way to increase your commissions is to share your link with potential shoppers."</p>
        <button @click="shareLink" class="px-8 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:translate-y-[-2px] transition-all active:scale-[0.98] shadow-lg shadow-gray-900/10 flex items-center gap-2">
          <Icon name="lucide:share-2" class="w-4 h-4" />
          Share Referral Link
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-50">
              <th class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Details</th>
              <th class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Status</th>
              <th class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Join Date</th>
              <th class="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Activity</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50/50">
            <tr v-for="r in referrals" :key="r._id" class="group hover:bg-gray-50/50 transition-colors">
              <td class="px-8 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                    {{ (r.fullName || r.email || 'U')[0].toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-bold text-gray-900">{{ r.fullName || 'Anonymous User' }}</p>
                    <p class="text-[10px] text-gray-400 font-medium">{{ r.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-4">
                <span :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest', 
                  r.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100']">
                  {{ r.isActive ? 'Active Member' : 'Verify Pending' }}
                </span>
              </td>
              <td class="px-8 py-4">
                <p class="text-xs font-semibold text-gray-500">{{ new Date(r.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
              </td>
              <td class="px-8 py-4 text-right">
                <button class="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                  <Icon name="lucide:more-horizontal" class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchReferrals } from '@/composables/modules/merchants/useFetchReferrals'
import { useFetchProfile } from '@/composables/modules/merchants/useFetchProfile'
import { useCustomToast } from '@/composables/core/useCustomToast'

definePageMeta({ layout: 'dashboard' })
const { referrals, fetchReferrals, loading } = useFetchReferrals()
const { profile, fetchProfile } = useFetchProfile()
const { showToast } = useCustomToast()

async function shareLink() {
  const link = profile.value?.referralLink
  if (!link) {
    await fetchProfile()
  }
  
  const finalLink = profile.value?.referralLink
  if (!finalLink) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Join WiseKings',
        text: 'Shop premium snacks and more on WiseKings using my referral link!',
        url: finalLink,
      })
    } catch (err) {
      // Handle error
    }
  } else {
    navigator.clipboard.writeText(finalLink)
    showToast({ title: 'Success', message: 'Referral link copied to clipboard!', toastType: 'success' })
  }
}

onMounted(() => {
  fetchReferrals()
  fetchProfile()
})
</script>
