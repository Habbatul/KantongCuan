<template>
  <div class="reports-view p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold text-[#35d58d] mb-8">Laporan Keuangan</h1>
    
 
      <div class="summary-item bg-[#282a31] rounded-lg p-6 shadow-lg border border-gray-700  mb-8">
        <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Asset</h3>
        <p class="text-2xl font-bold text-[#35d58d]">{{ formatCurrency(totalAssets) }}</p>
      </div>
      <div class="summary-item bg-[#282a31] rounded-lg p-6 shadow-lg border border-gray-700  mb-8">
        <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-2">Jumlah Asset</h3>
        <p class="text-2xl font-bold text-[#35d58d]">{{ assetCount }}</p>
      </div>



    <div class="section bg-[#282a31] rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
      <h2 class="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Perubahan 30 Hari Terakhir</h2>
      <div class="change-list space-y-3">
        <div 
          v-for="asset in assets" 
          :key="asset.id" 
          class="change-item flex justify-between items-center py-3 px-4 bg-gray-700/50 p-4 rounded-lg border border-gray-600 mb-5 hover:bg-gray-700/50 transition-colors overflow-x-auto"
        >
          <span class="text-gray-200 mr-5 whitespace-nowrap">{{ asset.name }}</span>
          <span :class="['font-medium ml-5', getChangeClass(calculate30DayChange(asset))]">
            {{ formatCurrency(calculate30DayChange(asset)) }}
          </span>
        </div>
      </div>
    </div>

    <div class="section bg-[#282a31] rounded-lg p-6 shadow-lg border border-gray-700 w-full">
        <h2 class="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Transaksi Terakhir</h2>
        
        <div class="overflow-x-auto pb-3">
            <table class="w-full">
            <thead>
                <tr class="text-gray-400 text-left border-b border-gray-700">
                <th class="pb-3 font-medium min-w-[100px]">Tanggal</th>
                <th class="pb-3 font-medium min-w-[150px]">Asset</th>
                <th class="pb-3 font-medium min-w-[160px]">Deskripsi</th>
                <th class="pb-3 font-medium text-right min-w-[120px]">Jumlah</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="recentTransactions.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-500">
                    Belum ada transaksi
                </td>
                </tr>
                <tr 
                v-for="tx in recentTransactions" 
                :key="tx.id" 
                class="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                <td class="py-3 text-gray-400 text-sm">{{ formatDate(tx.date) }}</td>
                <td class="py-3 text-[#35d58d] font-medium">{{ getAssetName(tx.assetId) }}</td>
                <td class="py-3 text-gray-300">{{ tx.description.length>14 ? tx.description.substring(0, 15) + '...' :  tx.description }}</td>
                <td :class="['py-3 font-bold text-right text-nowrap', tx.amount >= 0 ? 'text-[#35d58d]' : 'text-red-400']">
                    {{ formatCurrency(tx.amount) }}
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>

  </div>
</template>


<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup() {
    const assets = ref([])

    onMounted(() => {
      const savedAssets = localStorage.getItem('assets')
      if (savedAssets) {
        assets.value = JSON.parse(savedAssets)
      }
    })

    const totalAssets = computed(() => {
      return assets.value.reduce((total, asset) => total + asset.currentBalance, 0)
    })

    const assetCount = computed(() => assets.value.length)

    const recentTransactions = computed(() => {
      const allTx = []
      assets.value.forEach(asset => {
        asset.transactions.forEach(tx => {
          allTx.push({
            ...tx,
            assetId: asset.id
          })
        })
      })
      return allTx
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    })

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID')
    }

    const calculate30DayChange = (asset) => {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      return asset.transactions
        .filter(tx => new Date(tx.date) >= thirtyDaysAgo)
        .reduce((sum, tx) => sum + tx.amount, 0)
    }

    const getChangeClass = (change) => {
      return change >= 0 ? 'positive' : 'negative'
    }

    const getAssetName = (assetId) => {
      const asset = assets.value.find(a => a.id === assetId)
      return asset ? asset.name : 'Unknown'
    }

    return {
      assets,
      totalAssets,
      assetCount,
      recentTransactions,
      formatCurrency,
      formatDate,
      calculate30DayChange,
      getChangeClass,
      getAssetName
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0.3rem;
    height:0.2rem;
}
 
::-webkit-scrollbar-track {
    background: #265244;
}
 
::-webkit-scrollbar-thumb {
    background: #009a57;
}
 
::-webkit-scrollbar-thumb:hover {
    background: #00875a;
    cursor: pointer;
}
</style>