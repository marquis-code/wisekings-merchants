<template>
  <div>
    <definePageMeta :layout="'dashboard'" />
    <h1 class="text-2xl font-bold text-white mb-6">My Orders</h1>
    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Order #</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
        <tbody>
          <tr v-if="loading"><td colspan="5" class="text-center py-12 text-dark-400"><Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto" /></td></tr>
          <tr v-else-if="orders.length === 0"><td colspan="5" class="text-center py-12 text-dark-400">No orders yet</td></tr>
          <tr v-for="o in orders" :key="o._id" v-else>
            <td><code class="text-xs bg-dark-800 px-2 py-0.5 rounded">{{ o.orderNumber }}</code></td>
            <td class="text-dark-200 text-sm">{{ typeof o.customerId === 'object' ? (o.customerId as any)?.fullName : o.customerId }}</td>
            <td class="font-medium text-white">₦{{ o.totalAmount?.toLocaleString() }}</td>
            <td><span :class="o.status === 'delivered' || o.status === 'completed' ? 'badge-success' : 'badge-warning'">{{ o.status }}</span></td>
            <td class="text-dark-400 text-xs">{{ new Date(o.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchOrders } from '@/composables/modules/orders/useFetchOrders'

definePageMeta({ layout: 'dashboard' })

const { orders, loading, fetchOrders } = useFetchOrders()

onMounted(() => fetchOrders({ limit: 50 }))
</script>
