<template>
  <div>
    <div v-if="assets.length === 0" class="empty-message text-center py-8 text-gray-500">
      Belum ada asset yang ditambahkan
    </div>
    <div v-else class="space-y-3">
      <router-link
        v-for="asset in assets"
        :key="asset.id"
        :to="`/assets/${asset.id}/transactions`"
        class="asset-item flex justify-between items-center p-4 bg-gray-700/50  rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
      >
        <div class="flex items-center gap-4 mr-3">
          <div class="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
            {{ asset.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h3 class="font-medium text-gray-200">{{ asset.name }}</h3>
            <p class="text-sm text-gray-400">{{ asset.transactions.length }} transaksi</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-green-400 text-sm md:text-base font-medium text-nowrap">{{ formatCurrency(asset.currentBalance) }}</p>
          <button 
            @click="deleteAsset(asset.id)"
            class="text-xs text-red-400 hover:text-red-300 mt-1 cursor-pointer z-100">
            Hapus
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    assets: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value)
    },
    deleteAsset(assetId) {
      this.$emit('delete-asset', assetId)
    }
  }
}
</script>