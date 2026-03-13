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
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. The Marketplace Ecosystem</h2>
            <p>Welcome to the WiseKings Merchant Ecosystem. By integrating your products into our marketplace, you enter into a strategic distribution agreement with WiseKings Africa. We provide a high-frequency sales channel powered by a decentralized partner network. Merchants are responsible for maintaining optimal stock levels and ensuring that all products meet our premium quality standards.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Product Integrity & Brand Standards</h2>
            <p>Every product listed on the WiseKings store must adhere to strict regulatory and brand-specific quality benchmarks. Merchants must ensure:</p>
            <ul class="list-disc pl-6 space-y-3 mt-4 text-emerald-600 font-bold">
               <li>Valid NAFDAC or equivalent regional health and safety certifications.</li>
               <li>Honest representation of ingredients, expiry dates, and nutritional value.</li>
               <li>Premium packaging that reflects the WiseKings luxury snacking experience.</li>
            </ul>
            <p class="mt-4">The Company reserves the right to delist any SKU that fails to meet consumer satisfaction or safety KPIs.</p>
          </div>

          <div class="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm shadow-emerald-200/50">
             <h3 class="text-emerald-900 font-black mb-4 uppercase tracking-widest text-sm text-center">Commission Infrastructure & Fees</h3>
             <div class="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-2">Standard Sales</p>
                   <p class="text-2xl font-black text-slate-900 tracking-tighter">15%</p>
                </div>
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-2">Global Export</p>
                   <p class="text-2xl font-black text-slate-900 tracking-tighter">20%</p>
                </div>
                <div>
                   <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-2">Payout Fee</p>
                   <p class="text-2xl font-black text-slate-900 tracking-tighter">₦0.00</p>
                </div>
             </div>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Fulfillment & Last-Mile Delivery</h2>
            <p>Orders triggered through the WiseKings portal must be acknowledged within 4 business hours. Merchants are responsible for preparing shipments for pickup by WiseKings logistics partners. Failure to maintain a fulfillment rate of 98% or higher may result in reduced marketplace visibility.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Financial Settlements & Payouts</h2>
            <p>Merchant payouts are processed on a T+7 basis (7 days after confirmed customer delivery) to account for standard return windows. Funds are released from secure escrow directly into your Merchant Wallet. All financial transactions are logged and available for audit in your real-time Merchant Ledger.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">5. IP Usage & Collaborative Brand Identity</h2>
            <p>While on the marketplace, Merchants are granted a limited license to utilize the "WiseKings Approved Merchant" insignia. Conversely, WiseKings reserves the right to utilize Merchant product imagery for global marketing campaigns, social media promotion, and partner training materials.</p>
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
