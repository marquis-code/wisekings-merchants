<template>
  <div class="space-y-8 pb-12">
    <!-- Profile Hero Section -->
    <div class="relative overflow-hidden bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/20">
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -translate-x-1/4 translate-y-1/2 blur-3xl opacity-50"></div>
      
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="relative group">
          <div class="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-4xl font-black shadow-lg ring-4 ring-white">
            {{ user?.fullName?.[0] }}
          </div>
          <div class="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
            <Icon name="lucide:check" class="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        
        <div class="text-center md:text-left">
          <h1 class="text-3xl font-black text-gray-900 tracking-tight mb-2">{{ user?.fullName }}</h1>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span class="px-3.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100/50 flex items-center gap-1.5 capitalize">
              <Icon name="lucide:shield-check" class="w-3.5 h-3.5" />
              {{ (user as any)?.category || 'Standard' }} Member
            </span>
            <span class="px-3.5 py-1.5 bg-purple-50 text-purple-600 rounded-xl text-xs font-bold border border-purple-100/50 flex items-center gap-1.5 capitalize">
              <Icon name="lucide:star" class="w-3.5 h-3.5" />
              {{ (user as any)?.rank || 'Starter' }}
            </span>
          </div>
        </div>
        
        <div class="md:ml-auto flex items-center gap-4">
          <button @click="isEditing = !isEditing" class="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-gray-900/10 flex items-center gap-2 active:scale-95">
            <Icon :name="isEditing ? 'lucide:x' : 'lucide:edit-3'" class="w-4 h-4" />
            {{ isEditing ? 'Cancel Edit' : 'Edit Profile' }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Account Information -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              <Icon name="lucide:user" class="w-5 h-5" />
            </div>
            <h2 class="text-lg font-bold text-gray-900 tracking-tight">Account Information</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
              <div class="relative">
                <Icon name="lucide:user" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input v-model="editForm.fullName" :disabled="!isEditing" class="w-full bg-gray-50 border border-transparent rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-gray-800 disabled:opacity-70 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/50 transition-all" />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div class="relative">
                <Icon name="lucide:mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input :value="user?.email" class="w-full bg-gray-50 border border-transparent rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-gray-400 disabled:opacity-70 outline-none transition-all" disabled />
              </div>
              <p class="text-[9px] text-gray-400 px-1 mt-1">Email cannot be changed manually.</p>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
              <div class="relative">
                <Icon name="lucide:phone" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input v-model="editForm.phone" :disabled="!isEditing" class="w-full bg-gray-50 border border-transparent rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold text-gray-800 disabled:opacity-70 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/50 transition-all" />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Merchant Code</label>
              <div class="relative">
                <Icon name="lucide:ticket" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input :value="(user as any)?.merchantCode || '—'" class="w-full bg-gray-50 border border-transparent rounded-2xl pl-11 pr-4 py-3.5 text-sm font-mono font-bold text-emerald-600 disabled:opacity-70 outline-none transition-all" disabled />
              </div>
            </div>
          </div>

          <!-- Bank Details (Only visible/editable when editing or if already present) -->
          <div class="mt-8 pt-8 border-t border-gray-50">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Icon name="lucide:landmark" class="w-4 h-4 text-emerald-500" />
              Settlement Bank Details
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Bank Name</label>
                <input v-model="editForm.bankAccountDetails.bankName" :disabled="!isEditing" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-3.5 text-sm font-semibold text-gray-800 disabled:opacity-70 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/50 transition-all" placeholder="e.g. Zenith Bank" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Account Number</label>
                <input v-model="editForm.bankAccountDetails.accountNumber" :disabled="!isEditing" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-3.5 text-sm font-semibold text-gray-800 disabled:opacity-70 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/50 transition-all" placeholder="10 Digits" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Account Name</label>
                <input v-model="editForm.bankAccountDetails.accountName" :disabled="!isEditing" class="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-3.5 text-sm font-semibold text-gray-800 disabled:opacity-70 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/50 transition-all" placeholder="Full Account Name" />
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditing" class="mt-8 pt-8 border-t border-gray-50 flex justify-end">
            <button @click="saveProfile" :disabled="loading" class="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2 group">
              <Icon :name="loading ? 'lucide:loader-2' : 'lucide:save'" :class="['w-4 h-4', loading ? 'animate-spin' : 'group-hover:scale-110 transition-transform']" />
              {{ loading ? 'Saving Changes...' : 'Save Profile Changes' }}
            </button>
          </div>
        </div>

        <!-- Security & Preferences -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              <Icon name="lucide:lock" class="w-5 h-5" />
            </div>
            <h2 class="text-lg font-bold text-gray-900 tracking-tight">Security & Settings</h2>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                  <Icon name="lucide:shield-check" class="w-4.5 h-4.5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                  <p class="text-xs text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">Secure your account with 2FA</p>
                </div>
              </div>
              <span class="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100">Enabled</span>
            </div>
            
            <div class="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-blue-500 shadow-sm">
                  <Icon name="lucide:bell" class="w-4.5 h-4.5" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-900">Email Notifications</p>
                  <p class="text-xs text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none">Performance and sale alerts</p>
                </div>
              </div>
              <button class="text-xs font-bold text-blue-600 hover:underline">Manage</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Stats Sidebar -->
      <div class="space-y-6">
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white shadow-xl shadow-gray-900/20 relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div class="relative z-10">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Business Stats</h3>
            
            <div class="space-y-6">
              <div>
                <p class="text-xs text-gray-500 font-bold mb-1">CURRENT RANK</p>
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-black tracking-tight capitalize">{{ (user as any)?.rank || 'Starter' }}</span>
                  <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
              
              <div class="h-px bg-white/10 w-full"></div>
              
              <div>
                <p class="text-xs text-gray-500 font-bold mb-1">MEMBER SINCE</p>
                <p class="text-lg font-bold">{{ new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}</p>
              </div>

              <NuxtLink to="/wallet" class="mt-4 w-full py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all border border-white/10 active:scale-[0.98]">
                <Icon name="lucide:wallet" class="w-4 h-4" />
                Withdraw Funds
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          <div class="relative z-10">
            <h3 class="text-lg font-black leading-tight mb-2">Want to earn<br/>more rewards?</h3>
            <p class="text-emerald-100/80 text-xs font-medium mb-6">Upgrade your category to get higher commission rates on every order.</p>
            <button class="px-5 py-2.5 bg-white text-emerald-600 rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95">Upgrade Category</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState'
definePageMeta({ layout: 'dashboard' })

const { user, accessToken } = useAuthState()
const config = useRuntimeConfig()
const isEditing = ref(false)
const loading = ref(false)

const editForm = ref({
  fullName: '',
  phone: '',
  bankAccountDetails: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  }
})

// Initialize form when editing starts
watch(isEditing, (val) => {
  if (val && user.value) {
    editForm.value = {
      fullName: user.value.fullName || '',
      phone: (user.value as any).phone || '',
      bankAccountDetails: {
        bankName: (user.value as any).bankAccountDetails?.bankName || '',
        accountNumber: (user.value as any).bankAccountDetails?.accountNumber || '',
        accountName: (user.value as any).bankAccountDetails?.accountName || ''
      }
    }
  }
})

async function saveProfile() {
  loading.value = true
  try {
    const res: any = await $fetch(`${config.public.apiBase}/merchants/me`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      },
      body: editForm.value
    })
    
    if (res.message) {
      // In a real app we'd update the auth state and show a toast
      alert(res.message)
      isEditing.value = false
      // Reload page to get fresh data or update useAuthState manually
      window.location.reload()
    }
  } catch (error: any) {
    alert(error.data?.message || 'Failed to update profile')
  } finally {
    loading.value = false
  }
}
</script>
