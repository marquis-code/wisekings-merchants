<template>
  <div class="min-h-screen pb-12">
    <!-- Header -->
    <div class="mb-8 relative p-10 rounded-[2.5rem] overflow-hidden bg-[#033958] border border-white/5 shadow-md shadow-black/5 group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-1000"></div>
      <div class="relative z-10 text-white">
        <h1 class="text-3xl font-black mb-2 tracking-tight">Shelf Status Check</h1>
        <p class="text-white/60 max-w-xl text-lg font-medium leading-relaxed">Report real-time supermarket stock and upload shelf photos.</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Select Supermarket -->
      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Icon name="lucide:store" class="w-6 h-6" />
          </div>
          <div>
            <h2 class="text-lg font-black text-gray-900 tracking-tight">Select Location</h2>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest">Which store are you checking?</p>
          </div>
        </div>

        <CoreSelectInput 
          v-model="selectedMerchantId"
          label="Supermarket"
          :options="merchantOptions"
        />
      </div>

      <!-- Inventory Reporting -->
      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#033958]/5 flex items-center justify-center text-[#033958]">
            <Icon name="lucide:camera" class="w-6 h-6" />
          </div>
          <div>
            <h2 class="text-lg font-black text-gray-900 tracking-tight">Shelf Monitoring</h2>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest">Snap and Count</p>
          </div>
        </div>

        <!-- Camera / Photo Upload -->
        <div class="space-y-4">
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shelf Photo Proof</label>
          <div 
            @click="$refs.fileInput.click()"
            class="aspect-video rounded-[2rem] border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-[#033958]/20 hover:bg-white transition-all group overflow-hidden"
          >
            <template v-if="!photoPreview">
              <Icon name="lucide:camera" class="w-10 h-10 text-gray-200 group-hover:text-[#033958]/40 mb-3" />
              <p class="text-sm font-bold text-gray-400">Click to capture or upload</p>
            </template>
            <img v-else :src="photoPreview" class="w-full h-full object-cover" />
          </div>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handlePhotoUpload" />
        </div>

        <!-- Stock Count -->
        <div class="space-y-4">
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Current Stock Count (Packs)</label>
          <input 
            v-model="stockCount"
            type="number"
            placeholder="How many packs are on the shelf?"
            class="w-full h-16 px-8 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#033958]/20 transition-all font-black text-lg outline-none"
          />
        </div>

        <!-- Notes -->
        <div class="space-y-4">
          <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Observation Notes (Optional)</label>
          <textarea 
            v-model="notes"
            placeholder="Any comments about the shelf or display?"
            class="w-full h-32 p-8 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#033958]/20 transition-all font-medium text-sm outline-none resize-none"
          ></textarea>
        </div>

        <button 
          @click="submitReport"
          :disabled="submitting || !selectedMerchantId || !stockCount || !photoPreview"
          class="w-full h-16 rounded-2xl bg-[#033958] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#033958]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
        >
          <Icon v-if="submitting" name="lucide:loader-2" class="w-5 h-5 animate-spin mx-auto" />
          <span v-else>Submit Status Report</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchMerchants } from '@/composables/modules/merchants/useFetchMerchants'
import { useCustomToast } from '@/composables/core/useCustomToast'

definePageMeta({ layout: 'dashboard' })

const { merchants, fetchMerchants } = useFetchMerchants()
const { showToast } = useCustomToast()

const selectedMerchantId = ref('')
const stockCount = ref<number | null>(null)
const notes = ref('')
const photoPreview = ref<string | null>(null)
const photoFile = ref<File | null>(null)
const submitting = ref(false)

const merchantOptions = computed(() => merchants.value.map(m => ({
  label: m.fullName,
  value: m._id
})))

function handlePhotoUpload(e: any) {
  const file = e.target.files[0]
  if (file) {
    photoFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => photoPreview.value = e.target?.result as string
    reader.readAsDataURL(file)
  }
}

async function submitReport() {
  submitting.value = true
  try {
    // API Call would go here
    await new Promise(r => setTimeout(r, 1500))
    showToast({ title: 'Success', message: 'Shelf status reported successfully', toastType: 'success' })
    navigateTo('/commissions')
  } catch {
    showToast({ title: 'Error', message: 'Failed to submit report', toastType: 'error' })
  } finally {
    submitting.value = false
  }
}

onMounted(() => fetchMerchants({ page: 1, limit: 100 }))
</script>
