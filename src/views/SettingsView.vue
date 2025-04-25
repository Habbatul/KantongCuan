<template>
  <div class="settings-view py-6 px-2 mx-auto">

<div class="bg-[#282a31] rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
  <h2 class="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Manage Data</h2>
  <div class="action-buttons grid grid-cols-1 md:grid-cols-3 gap-4">
    <button 
      @click="exportData" 
      class="w-full md:w-auto cursor-pointer btn-export flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 py-3 px-4 rounded-lg transition-colors duration-200 border border-[#4dd598]/20"
    >
      <span class="icon ml-[-0.2rem]">📤</span>
      <span class="whitespace-nowrap">Ekspor Data</span>
    </button>
    <button 
      @click="importData" 
      class="w-full md:w-auto cursor-pointer btn-import flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 py-3 px-4 rounded-lg transition-colors duration-200 border border-[#4dd598]/20"
    >
      <span class="icon ml-[-0.2rem]">📥</span>
      <span class="whitespace-nowrap">Impor Data</span>
    </button>
    <button 
      @click="resetData" 
      class="w-full md:w-auto cursor-pointer btn-reset flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-red-400 hover:text-red-300 py-3 px-4 rounded-lg transition-colors duration-200 border border-red-400/20"
    >
      <span class="icon ml-[-0.2rem]">⚠️</span>
      <span class="whitespace-nowrap">Reset Data</span>
    </button>
  </div>
</div>

    <div class="bg-[#282a31] rounded-lg shadow-lg border border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2">Statistik</h2>
      <div class="stat-item bg-gray-700/50 p-4 rounded-lg border border-gray-600 mb-5">
        <span class="block text-gray-400 text-sm mb-1">Total Asset</span>
        <strong class="block text-2xl font-bold text-[#35d58d]">{{ formatCurrency(totalAssets) }}</strong>
      </div>
      <div class="stats gap-4 flex justify-between content-center">
        <div class="stat-item bg-gray-700/50 p-4 rounded-lg border border-gray-600 w-full">
          <span class="block text-gray-400 text-sm mb-1">Jumlah Asset</span>
          <strong class="block text-2xl font-bold text-[#35d58d]">{{ assetCount }}</strong>
        </div>
        <div class="stat-item bg-gray-700/50 p-4 rounded-lg border border-gray-600 w-full">
          <span class="block text-gray-400 text-sm mb-1">Total Transaksi</span>
          <strong class="block text-2xl font-bold text-[#35d58d]">{{ transactionCount }}</strong>
        </div>
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

    const transactionCount = computed(() => {
      return assets.value.reduce((count, asset) => count + asset.transactions.length, 0)
    })

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value)
    }

    const exportData = () => {
      const data = {
        assets: localStorage.getItem('assets'),
        exportedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `backup-asset-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    const importData = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      
      input.onchange = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onload = event => {
          try {
            const data = JSON.parse(event.target.result)
            if (!data.assets) {
              throw new Error('Format file tidak valid')
            }
            
            localStorage.setItem('assets', data.assets)
            alert('Data berhasil diimpor! Aplikasi akan direfresh.')
            setTimeout(() => location.reload(), 1000)
          } catch (error) {
            alert('Gagal mengimpor data: ' + error.message)
          }
        }
        
        reader.readAsText(file)
      }
      
      input.click()
    }

    const resetData = () => {
      if (confirm('Apakah Anda yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan.')) {
        localStorage.removeItem('assets')
        alert('Data telah direset. Aplikasi akan direfresh.')
        setTimeout(() => location.reload(), 1000)
      }
    }

    return {
      totalAssets,
      assetCount,
      transactionCount,
      formatCurrency,
      exportData,
      importData,
      resetData
    }
  }
}
</script>