<template>
  <div class="min-h-screen bg-[#F0FDF4] text-slate-900 font-inter selection:bg-emerald-100 overflow-x-hidden">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">

    <!-- Premium Navigation -->
    <nav :class="['fixed top-0 w-full z-[100] transition-all duration-300 border-b', scrolled ? 'bg-white/90 backdrop-blur-xl border-emerald-100 py-3 shadow-sm' : 'bg-transparent border-transparent py-5']">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white text-lg font-black italic">W</span>
          </div>
          <span class="text-xl font-black font-outfit uppercase tracking-tighter text-emerald-900">WiseKings</span>
        </div>

        <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <a href="#growth" class="hover:text-emerald-600 transition-colors">Why Sell?</a>
          <a href="#how" class="hover:text-emerald-600 transition-colors">Process</a>
          <a href="#revenue" class="hover:text-emerald-600 transition-colors">Revenue Estimator</a>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/login" class="text-slate-600 hover:text-emerald-900 font-bold text-sm px-4">Log In</NuxtLink>
          <NuxtLink to="/signup" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/10 transition-all active:scale-95">
            Start Selling
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Merchant Hero -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-20 rounded-l-[100px] -z-0"></div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div class="space-y-8 reveal transition-all duration-1000 transform translate-y-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
            <span class="text-[10px] font-black uppercase tracking-widest">Global Merchant Network 2026</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-black font-outfit leading-[1.1] tracking-tight text-slate-900">
            Scale your flavor <br/>
            <span class="text-emerald-600">across Africa.</span>
          </h1>

          <p class="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
            Join the most innovative snack marketplace. We handle the logistics and marketing while you focus on making the best products. Sell globally, get paid locally.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <NuxtLink to="/signup" class="px-8 py-4 bg-emerald-900 text-white rounded-xl font-bold text-base shadow-xl hover:bg-emerald-800 transition-all flex items-center gap-3 justify-center group">
              Start Your Store
              <Icon name="lucide:shopping-cart" size="20" class="group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <div class="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <Icon name="lucide:map-pin" class="text-emerald-600" size="20" />
              <p class="text-xs font-bold text-slate-600">Active in <span class="text-emerald-600">12 countries</span></p>
            </div>
          </div>
        </div>

        <div class="relative group reveal transition-all duration-1000 delay-300 transform scale-95 opacity-0">
          <div class="aspect-square bg-emerald-50 rounded-[3rem] overflow-hidden shadow-2xl relative border border-emerald-100">
            <img src="@/assets/images/hero2.jpg" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Merchant Global Success" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent"></div>

            <!-- Dashboard Preview Widget -->
            <div class="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-50 animate-float">
               <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                     <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                        <Icon name="lucide:trending-up" size="20" />
                     </div>
                     <div>
                        <p class="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Sales Today</p>
                        <p class="text-lg font-black text-slate-900">₦245,500.00</p>
                     </div>
                  </div>
                  <div class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Sell With Us (Growth) -->
    <section id="growth" class="py-24 bg-[#F0FDF4]/30">
       <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 reveal transition-all duration-1000 transform translate-y-8">
          <h2 class="text-3xl lg:text-5xl font-black font-outfit mb-4 uppercase tracking-tighter">Everything you need to succeed</h2>
          <p class="text-lg text-slate-500 font-medium max-w-2xl mx-auto">We've built the tools so you don't have to. Focus on your product, we'll handle the rest.</p>
       </div>

       <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(f, i) in features" :key="f.title" 
               class="bg-white p-8 rounded-3xl shadow-sm border border-emerald-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-1000 transform translate-y-12 reveal"
               :style="{ transitionDelay: `${i * 100}ms` }">
             <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 border border-emerald-100">
                <Icon :name="f.icon" class="text-emerald-600" size="24" />
             </div>
             <h3 class="text-xl font-bold font-outfit mb-3">{{ f.title }}</h3>
             <p class="text-sm text-slate-500 font-medium leading-relaxed">{{ f.desc }}</p>
          </div>
       </div>
    </section>

    <!-- Revenue Estimator -->
    <section id="revenue" class="py-24 bg-white">
       <div class="max-w-4xl mx-auto px-6 lg:px-12 bg-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden reveal transition-all duration-1000 transform scale-95 opacity-0">
          <div class="absolute -right-20 -top-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-[100px]"></div>
          
          <div class="relative z-10 text-center mb-12">
             <h2 class="text-3xl font-black font-outfit mb-2">Revenue Estimator</h2>
             <p class="text-emerald-200 font-medium italic">Estimate your monthly earnings based on sales volume.</p>
          </div>

          <div class="relative z-10 space-y-10">
             <div class="space-y-4">
                <div class="flex justify-between font-bold text-sm tracking-widest uppercase text-emerald-200">
                   <span>Monthly Orders</span>
                   <span class="text-white">{{ orders.toLocaleString() }} Orders</span>
                </div>
                <input type="range" v-model="orders" min="10" max="1000" step="10" class="w-full h-2 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-white" />
                <div class="flex justify-between text-[10px] font-black uppercase text-emerald-600">
                   <span>10 Orders</span>
                   <span>1,000 Orders</span>
                </div>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
                   <p class="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Estimated Monthly Revenue</p>
                   <p class="text-3xl font-black text-white">₦{{ (orders * 5000).toLocaleString() }}</p>
                   <p class="text-[10px] text-emerald-500 font-bold mt-1">*Based on avg order ₦5,000</p>
                </div>
                <div class="p-6 bg-white/5 border border-white/10 rounded-2xl">
                   <p class="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Platform Visibility</p>
                   <p class="text-3xl font-black text-emerald-300">Infinite</p>
                   <p class="text-[10px] text-emerald-500 font-bold mt-1">Access to global snack lovers</p>
                </div>
             </div>
             
             <NuxtLink to="/signup" class="block w-full text-center py-4 bg-white text-emerald-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all">Start Selling Now</NuxtLink>
          </div>
       </div>
    </section>

    <!-- Global Scaling Strategy -->
    <section id="how" class="py-24 overflow-hidden">
       <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div class="space-y-8 reveal transition-all duration-1000 transform -translate-x-12 opacity-0">
             <h2 class="text-4xl lg:text-6xl font-black font-outfit tracking-tighter">Your bridge to <br/><span class="text-emerald-600">Universal Commerce.</span></h2>
             <p class="text-lg text-slate-500 font-medium leading-relaxed">
                Join a network that handles the hard stuff. We provide the platform, the payment rails, and the global logistics. You provide the snacks that people love.
             </p>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="point in strategyPoints" :key="point.title" class="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 transition-all hover:translate-y-1">
                   <Icon :name="point.icon" class="text-emerald-600 mb-3" size="24" />
                   <h4 class="font-bold text-slate-900 mb-1 font-outfit">{{ point.title }}</h4>
                   <p class="text-xs text-slate-500">{{ point.desc }}</p>
                </div>
             </div>
          </div>
          <div class="relative reveal transition-all duration-1000 transform translate-x-12 opacity-0">
             <div class="absolute -inset-10 bg-emerald-500/10 blur-[100px] -z-0"></div>
             <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000&auto=format&fit=crop" class="relative z-10 rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Global Merchandising" />
          </div>
       </div>
    </section>

    <!-- Professional Footer -->
    <footer class="bg-emerald-950 text-white pt-20 pb-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-2 space-y-6">
          <div class="flex items-center gap-2">
             <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-black text-emerald-900 italic">W</div>
             <span class="text-xl font-black font-outfit uppercase">WiseKings</span>
          </div>
          <p class="text-emerald-400 max-w-sm text-sm leading-relaxed">
            Revolutionizing the African snacks marketplace through digital enablement and global logistics for local merchants.
          </p>
        </div>
        
        <div>
           <h5 class="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6 font-outfit">Legal & Privacy</h5>
            <ul class="space-y-4 text-sm font-bold text-emerald-400">
               <li><NuxtLink to="/welcome" class="hover:text-white transition-colors">Merchant Home</NuxtLink></li>
               <li><NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink></li>
               <li><NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink></li>
               <li><a href="https://partners.wisekings.ng" target="_blank" class="hover:text-white transition-colors">Partner Portal</a></li>
            </ul>
        </div>

        <div>
           <h5 class="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6 font-outfit">Connect</h5>
           <div class="flex gap-4 mb-8">
             <a href="https://x.com/WisekingsS" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer">
                <Icon name="lucide:twitter" size="16" />
             </a>
             <a href="https://www.instagram.com/wisekingsproducts/" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer">
                <Icon name="lucide:instagram" size="16" />
             </a>
             <a href="https://web.facebook.com/profile.php?id=61583785186822" target="_blank" class="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all cursor-pointer">
                <Icon name="lucide:facebook" size="16" />
             </a>
           </div>
           <p class="text-[10px] font-bold text-emerald-600 uppercase">Merchant Support: sellers@wisekings.ng</p>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5 pt-10 text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em]">
         <p>&copy; 2026 WiseKings Africa. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/core/useScrollReveal'

const scrolled = ref(false)
const orders = ref(100)

useScrollReveal()

const features = [
  { title: 'Global Storefront', desc: 'Your products listed on a premium marketplace visible to thousands of international buyers.', icon: 'lucide:globe' },
  { title: 'Logistics Shield', desc: 'We handle delivery and shipping. Just pack your product, and our riders do the rest.', icon: 'lucide:truck' },
  { title: 'Instant Payouts', desc: 'Recieve your money immediately into your secure wallet. No long waiting times.', icon: 'lucide:wallet' },
  { title: 'Sales Analytics', desc: 'See which snacks are trending and track your revenue growth with daily reports.', icon: 'lucide:bar-chart' },
  { title: 'Store Rating', desc: 'Build trust with verified customer reviews and a professional merchant certificate.', icon: 'lucide:star' },
  { title: 'Direct Chat', desc: 'Communicate directly with your customers to build long-term relationships.', icon: 'lucide:message-circle' }
]

const strategyPoints = [
  { title: 'Easy Listing', desc: 'Upload photos and set prices in under 60 seconds.', icon: 'lucide:plus-circle' },
  { title: 'Secure Escrow', desc: 'Payments are held securely so you never lose a sale.', icon: 'lucide:shield-check' },
  { title: 'Global Tracking', desc: 'Watch your orders move across the continent in real-time.', icon: 'lucide:map' },
  { title: 'Growth Loans', desc: 'Access capital to scale your production based on sales history.', icon: 'lucide:banknote' }
]

if (import.meta.client) {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
}

definePageMeta({ layout: false })
</script>

<style scoped>
.font-inter { font-family: 'Inter', sans-serif; }
.font-outfit { font-family: 'Outfit', sans-serif; }

/* Reveal Animation Classes */
.reveal {
  opacity: 0;
  will-change: transform, opacity;
}

.reveal-visible {
  opacity: 1 !important;
  transform: translate(0, 0) scale(1) !important;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}

input[type=range]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #064E3B;
  border-radius: 4px;
}
</style>
