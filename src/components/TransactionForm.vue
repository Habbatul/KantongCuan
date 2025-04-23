<template>
  <h3 class="text-xl ml-1 mb-4 text-gray-200 font-medium">Tambah Transaksi</h3>
  <div class="border p-5 rounded-2xl  mb-5">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label>Jenis Transaksi:</label>
        <div class="rounded-lg px-2 flex flex-col gap-1 text-gray-400">
        <label class="w-full">
            <input 
            type="radio" 
            v-model="transaction.type" 
            value="income"
            checked
            />
            Pemasukan
        </label>
        <label class="w-full">
            <input 
            type="radio" 
            v-model="transaction.type" 
            value="expense"
            />
            Pengeluaran
        </label>
        </div>
      </div>
      
      <div class="mb-3">
        <label for="amount">Jumlah (Rp):</label>
        <input 
          type="number" 
          id="amount" 
          v-model="transaction.amount" 
          min="1"
          required
          class="rounded-lg px-2 border border-[#4dd598]/20 bg-gray-700 w-full text-gray-400"
        />
      </div>
      
      <div class="form-group mb-5">
        <label for="description">Keterangan:</label>
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
        amount: 0,
        description: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('transaction-added', {
        type: this.transaction.type,
        amount: parseFloat(this.transaction.amount),
        description: this.transaction.description
      })
      this.resetForm()
    },
    resetForm() {
      this.transaction = {
        type: 'income',
        amount: 0,
        description: ''
      }
    }
  }
}
</script>