<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black/70 bg-opacity-60" @click="$emit('close')"></div>
    
    <div class="relative bg-[#151618] border border-gray-500 rounded-lg p-6 w-full max-w-md mx-4">
      <h2 class="text-xl font-semibold mb-4">Ubah Transaksi</h2>
      
      <form @submit.prevent="submitForm" @click.stop>
        <div class="mb-3 flex-row">
          <div class="mb-1">Jenis Transaksi:</div>
          <div class="rounded-lg px-2 flex flex-col gap-1 text-gray-400">
            <div class="w-full">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="transaction.type" 
                  value="expense"
                  class="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-[#ff6262] checked:border-[#cecece] focus:outline-none"
                />
                <span>Pengeluaran</span>
              </label>
            </div>
            <div class="w-full">
              <label class="inline-flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  v-model="transaction.type" 
                  value="income"
                  class="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-[#35d58d] checked:border-[#cecece] focus:outline-none"
                />
                <span>Pemasukan</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="mb-3 flex-row">
          <div class="mb-1" for="amount">Jumlah (Rp):</div>
          <input 
            type="number" 
            id="amount" 
            v-model="transaction.amount" 
            min="1"
            required
            class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 w-full text-gray-400"
          />
        </div>

        <div class="mb-3 flex-row">
          <div class="mb-1" for="date">Tanggal :</div>
          <input 
            type="datetime-local" 
            id="date" 
            v-model="transaction.date" 
            min="1"
            required
            class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 w-full text-gray-400"
          />
        </div>
        
        <div class="form-group mb-5">
          <div class="mb-1" for="description">Keterangan:</div>
          <input 
            type="text" 
            id="description" 
            v-model="transaction.description" 
            required
            class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 w-full text-gray-400"
          />
        </div>
        
        <div class="flex justify-end gap-2">
          <button 
            type="button" 
            @click="$emit('close')"
            class="py-1 px-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors"
          >
            Batal
          </button>
          <button type="submit" class="py-1 px-2 cursor-pointer btn-import flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 rounded-lg transition-colors duration-200 border border-[#4dd598]/80">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transactionData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      transaction: {...this.transactionData}
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.transaction)
      this.$emit('close')
    }
  }
}
</script>