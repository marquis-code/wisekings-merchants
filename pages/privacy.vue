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
          <p class="text-lg font-medium text-slate-700">We understand that your business data — from recipes to sales volumes — is your most valuable asset. Our promise is simple: We secure your data, and we never share it with your competitors.</p>

          <div>
             <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">1. Business Information We Collect</h2>
             <p>As a merchant, we collect data to optimize your store performance and manage logistics:</p>
             <ul class="list-disc pl-6 space-y-2 mt-4 font-bold text-slate-700">
                <li>Operational Data: Product listings, inventory levels, and production capacities.</li>
                <li>Financial Records: Sales history, commission deductions, and payout bank accounts.</li>
                <li>Strategic Insights: Customer order patterns and store ratings.</li>
             </ul>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">2. Guarding Your Secret Sauce</h2>
            <p>Any proprietary information you share regarding your production processes or unique snack recipes is treated as highly confidential. WiseKings employees access this data only when necessary for quality control audits or logistical planning.</p>
          </div>

          <div class="p-8 bg-emerald-900 text-white rounded-3xl shadow-xl">
             <h3 class="text-emerald-400 font-black mb-2 uppercase tracking-widest text-sm">Military-Grade Security</h3>
             <p class="text-slate-300 text-sm">We utilize banking-standard encryption for all merchant transaction data. Your store credentials are secured with hardware-level protection and mandatory Multi-Factor Authentication (MFA).</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">3. Marketplace Analytics</h2>
            <p>We aggregate anonymized sales data to provide you with market trends and benchmarks. For example, we may tell you that "Spicy Plantain Chips" are trending in Nairobi, without revealing the specific sales data of individual competing merchants.</p>
          </div>

          <div>
            <h2 class="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">4. Third-Party Fulfillment</h2>
            <p>We share only the necessary order details (delivery address, customer name) with our vetted Logistics Partners to ensure your products reach the buyer safely and on time.</p>
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
