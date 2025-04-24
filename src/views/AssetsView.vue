<template>
  <div class="assets-view max-w-6xl mx-auto">

    <h1 class="text-2xl font-bold text-[#35d58d] mb-3 mx-5">Daftar Asset</h1>

    <div class="total-balance bg-[#282a31] px-4 py-2 mx-5 rounded-lg border-2 border-[#347052] mb-8">
      <span class="text-gray-300 font-medium">Total Asset: </span>
      <strong class="text-[#35d58d]">{{ formatCurrency(totalAssets) }}</strong>
    </div>

    <AssetForm @asset-added="addAsset" class="mb-8" />

    <div class="asset-list-section">
      <h2 class="text-xl font-semibold text-gray-200 mb-4 border-b border-gray-700 pb-2 mx-5">Daftar Asset</h2>
      <AssetList 
        :assets="assets"
        @delete-asset="deleteAsset"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AssetForm from '@/components/AssetForm.vue'
import AssetList from '@/components/AssetList.vue'

export default {
  components: {
    AssetForm,
    AssetList
  },
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

    const saveData = () => {
      localStorage.setItem('assets', JSON.stringify(assets.value))
    }

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value)
    }

    const addAsset = (newAsset) => {
      assets.value.push({
        id: Date.now(),
        name: newAsset.name,
        initialBalance: newAsset.initialBalance,
        currentBalance: newAsset.initialBalance,
        transactions: []
      })
      saveData()
    }

    const deleteAsset = (assetId) => {
      assets.value = assets.value.filter(a => a.id !== assetId)
      saveData()
    }

    return {
      assets,
      totalAssets,
      formatCurrency,
      addAsset,
      deleteAsset
    }
  }
}
</script>

<style scoped>
.asset-list-section {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

.asset-list-section::-webkit-scrollbar {
  width: 6px;
}

.asset-list-section::-webkit-scrollbar-track {
  background: #1f2937;
}

.asset-list-section::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}
</style>