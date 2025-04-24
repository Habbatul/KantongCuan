<template>
  <h3 class="text-xl ml-1 mb-4 text-gray-200 font-medium">Tambah Transaksi</h3>
  <div class="border p-5 rounded-2xl  mb-10">
    <form @submit.prevent="submitForm">
        <div class="mb-3 flex-row">
            <div class="mb-1">Jenis Transaksi:</div>
            <div class="rounded-lg px-2 flex flex-col gap-1 text-gray-400">
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

      <!-- <div class="mb-3 flex-row">
        <div class="mb-1" for="date">Tanggal :</div>
        <input 
          type="datetime-local" 
          id="date" 
          v-model="transaction.date" 
          min="1"
          required
          class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 w-full text-gray-400"
        />
      </div> -->
      
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
      
      <button type="submit"  class="py-1 px-2 cursor-pointer btn-import flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 rounded-lg transition-colors duration-200 border border-[#4dd598]/80">Tambah Transaksi</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transaction: {
        type: 'income',
        amount: '',
        description: '',
        date: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('transaction-added', {
        type: this.transaction.type,
        amount: parseFloat(this.transaction.amount),
        description: this.transaction.description,
      })
      this.resetForm()
    },
    resetForm() {
      this.transaction = {
        type: 'income',
        amount: '',
        description: '',
        date: ''
      }
    }
  }
}
</script>