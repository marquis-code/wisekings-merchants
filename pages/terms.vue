<template>
  <div class="min-h-screen bg-slate-50 font-inter text-slate-800">
    <nav class="border-b border-emerald-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-emerald-600">Merchant Governance Book</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-xl shadow-emerald-200/20 border border-emerald-50">
        <header class="border-b border-slate-100 pb-12 mb-12">
          <div class="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-900/20">
             <Icon name="lucide:store" size="32" />
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Merchant Terms</h1>
          <p class="text-slate-500 font-bold font-mono text-xs uppercase tracking-[0.2em]">Scale with Integrity | Effective: March 2026</p>
        </header>

        <section class="prose prose-emerald max-w-none space-y-12 text-slate-600 leading-relaxed">
          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Marketplace Ecosystem</h2>
            <p>WiseKings Africa provides a global snacks marketplace. By listing products, you agree to fulfill orders with high-quality standards and professional packaging. Merchants are independent contractors and not employees of the Company.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Product Integrity & Compliance</h2>
             <p>All listed products must meet regional health and safety certifications. WiseKings reserves the right to request proof of production standards. Prohibited items or mislabelling will result in store suspension without prior notice.</p>
          </div>

          <div class="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
             <h3 class="text-emerald-900 font-black mb-4 uppercase tracking-widest text-sm text-center">Commission & Fees</h3>
             <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase">Standard Sales</p>
                   <p class="text-2xl font-black text-slate-900">5%</p>
                </div>
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase">Global Export</p>
                   <p class="text-2xl font-black text-slate-900">8%</p>
                </div>
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase">Payout Fee</p>
                   <p class="text-2xl font-black text-slate-900">₦0.00</p>
                </div>
             </div>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Fulfillment & Logistics</h2>
            <p>Merchants must mark orders as "Packaged" within 12-24 hours of notification. WiseKings Logistics partners will handle pickup. Excessive delays or "Out of Stock" cancellations (over 5% rate) will impact your Merchant Score and visibility.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Payouts & Escrow</h2>
            <p>Funds from sales are held in secure escrow until the customer confirms receipt or 48 hours post-delivery. Once released, funds are available in your Merchant Wallet. Payouts to bank accounts are processed daily.</p>
          </div>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">5. Brand Usage</h2>
             <p>Merchants are encouraged to use "Verified by WiseKings" badges on their packaging. However, unauthorized use of WiseKings corporate branding for non-marketplace activities is prohibited.</p>
          </div>
        </section>

        <footer class="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
           <p>WiseKings Global Merchant Services</p>
           <p>Doc Ref: WK-MT-2026-V2</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
