<template>
  <div class="asset-form">
    <form @submit.prevent="submitForm" class="bg-[#282a31] rounded-lg shadow-lg border border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-2">Tambah Asset Baru</h2>
      <div class="flex justify-between mb-4 text-gray-200">
        <label for="assetName" class="w-1/2 text-left">Nama Asset</label>
        <input 
          type="text" 
          id="assetName" 
          v-model="asset.name" 
          required
          class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 ml-2 w-full"
        />
      </div>
      <div class="flex justify-between mb-7 text-gray-200">
        <label for="initialBalance" class="w-1/2 text-left">Saldo Awal (Rp)</label>
        <input 
          type="number" 
          id="initialBalance" 
          v-model="asset.initialBalance" 
          min="1"
          required
          class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 ml-2 w-full"
        />
      </div>
      <div class="flex justify-center">
        <button type="submit" class="py-1 px-2 cursor-pointer btn-import flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 rounded-lg transition-colors duration-200 border border-[#4dd598]/80">Tambah Asset</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asset: {
        name: '',
        initialBalance: 0
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('asset-added', {
        name: this.asset.name,
        initialBalance: parseFloat(this.asset.initialBalance)
      })
      this.asset.name = ''
      this.asset.initialBalance = 0
    }
  }
}
</script>