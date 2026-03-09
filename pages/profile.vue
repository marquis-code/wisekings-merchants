<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">Profile</h1>
    <div class="max-w-xl card space-y-4">
      <div class="text-center mb-4"><div class="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-2xl font-bold mx-auto">{{ user?.fullName?.[0] }}</div></div>
      <div><label class="label">Full Name</label><input :value="user?.fullName" class="input" disabled /></div>
      <div><label class="label">Email</label><input :value="user?.email" class="input" disabled /></div>
      <div><label class="label">Merchant Code</label><input :value="(user as any)?.merchantCode" class="input" disabled /></div>
      <div><label class="label">Category</label><input :value="(user as any)?.category" class="input capitalize" disabled /></div>
      <div><label class="label">Rank</label><input :value="(user as any)?.rank" class="input capitalize" disabled /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthState } from '@/composables/useAuthState'
definePageMeta({ layout: 'dashboard' })
const { user } = useAuthState()
</script>
