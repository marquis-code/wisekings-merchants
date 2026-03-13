<template>
  <div class="min-h-screen bg-emerald-50/30 font-inter text-slate-800">
    <nav class="border-b border-emerald-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/welcome" class="flex items-center gap-2 group">
          <Icon name="lucide:arrow-left" size="18" class="group-hover:-translate-x-1 transition-transform" />
          <span class="font-bold text-sm">Back to Home</span>
        </NuxtLink>
        <span class="text-[10px] font-black uppercase tracking-widest text-emerald-600">Merchant Data Protection</span>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-20">
      <div class="bg-white rounded-[2.5rem] p-10 md:p-20 shadow-xl shadow-emerald-200/10 border border-emerald-50 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-bl-[100px] -z-0"></div>
        
        <header class="border-b border-slate-100 pb-12 mb-12 relative z-10">
          <div class="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-600/20">
             <Icon name="lucide:glasses" size="32" />
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Merchant Privacy</h1>
          <p class="text-slate-500 font-bold font-mono text-xs uppercase tracking-[0.2em]">Partner Hub Security | Last Updated: March 2026</p>
        </header>

        <section class="prose prose-emerald max-w-none space-y-12 text-slate-600 leading-relaxed relative z-10">
          <p class="text-lg font-medium text-slate-700 leading-relaxed">We understand that your business data — from proprietary logistics to regional sales volumes — is your most valuable asset. Our promise is unequivocal: We secure your data using banking-grade infrastructure, and we maintain an absolute wall between your strategic information and your competitors.</p>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Business Information Intelligence</h2>
             <p>As a merchant, we collect granular data to optimize your store performance and manage the supply chain:</p>
             <ul class="list-disc pl-6 space-y-3 mt-4 font-bold text-slate-700">
                <li><span class="text-emerald-600">Operational Datasets:</span> SKU-level listings, real-time inventory buffers, and production lead times.</li>
                <li><span class="text-emerald-600">Fiscal Records:</span> Transactional ledger history, platform fee deductions, and verified settlement accounts.</li>
                <li><span class="text-emerald-600">Consumer Analytics:</span> Anonymized order patterns and aggregate store performance metrics.</li>
             </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Protecting Your Proprietary Information</h2>
            <p>Any proprietary information you share regarding your production methodologies or unique snack formulations is classified as "Restricted" within our systems. Access is strictly audited and limited to quality control specialists and senior logistical planners. We do not engage in the harvesting of merchant recipes for the creation of WiseKings-owned "private label" equivalents.</p>
          </div>

          <div class="p-8 bg-emerald-900 text-white rounded-3xl shadow-xl border border-emerald-800">
             <h3 class="text-emerald-400 font-black mb-2 uppercase tracking-widest text-sm">Enterprise-Grade Architecture</h3>
             <p class="text-slate-300 text-sm leading-relaxed">Merchant data is protected by hardware security modules (HSMs) and mandatory Multi-Factor Authentication (MFA). We employ zero-trust networking principles, meaning all data access requests are verified and logged in real-time to prevent internal or external breaches.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Strategic Marketplace Benchmarking</h2>
            <p>We aggregate anonymized sales data to provide Merchants with critical market trends and benchmarking reports. While we may share that specific snack categories are experiencing high demand in particular regions, we never reveal the exact sales volumes or customer lists of individual competing merchants.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Secure Third-Party Integrations</h2>
            <p>We share only essential order details (delivery destination, recipient name, and weight) with our vetted Logistics Partners. These partners have signed strict Non-Disclosure Agreements (NDAs) and are prohibited from utilizing merchant data for any purpose other than successful shipment fulfillment.</p>
          </div>
        </section>

        <footer class="mt-20 pt-10 border-t border-slate-100 relative z-10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
           <p>WiseKings Africa | Merchant Privacy Portal</p>
           <p>Doc Ref: WK-MPR-2026-V1</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
</script>
