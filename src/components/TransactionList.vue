<template>
    <div id="riwayat-header" class="border py-2 px-3 rounded-lg  mb-4 pb-4">
        <div class="flex justify-between items-center mb-4 border-b px-1 pb-2">
            <h3 class="text-lg font-medium text-gray-200">Riwayat Transaksi</h3>
            <span class="text-gray-400 text-sm">
            {{ transactions.length }} transaksi
            </span>
        </div>

        <div v-if="transactions.length > 0" class="flex w-full justify-start mt-5">
            <button 
            @click="showConfirmModal = true"
            class="text-base bg-red-800/10 hover:bg-gray-600 text-red-500 hover:text-red-300 py-1 px-3 rounded-lg transition-colors duration-200 border border-red-500/50 cursor-pointer"
            >
            Hapus Semua
            </button>
        </div>
    </div>

    <transaction-delete-modal 
    :show="showConfirmModal"
    @close="showConfirmModal = false"
    @confirm="() => { deleteAll() }"
    />

    <transaction-edit-modal
      v-if="showEditModal"
      :transaction-data="selectedTransaction"
      @close="showEditModal = false"
      @submit="handleTransactionUpdate"
    />


  <div v-if="transactions.length > 0" class="transaction-list rounded-2xl">

    <div class="overflow-y-auto border border-gray-500 rounded-t bg-gray-700/60">
      <table class="min-w-full min text-left border-collapse">
        <thead>
          <tr class="text-gray-200 text-base bg-gray-800/20">
            <th class="py-2 px-4 border-b border-r border-gray-500 min-w-[6.7rem]">Tanggal</th>
            <th class="py-2 px-4 border-b border-r border-gray-500">Keterangan</th>
            <th class="py-2 px-4 border-b border-r border-gray-500">Jumlah</th>
            <th class="py-2 px-4 border-b border-gray-500">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="transaction in sortedTransactions" 
            :key="transaction.id" 
            class="text-base text-gray-200"
          >
            <td class="py-2 px-4 border-r border-t border-gray-500 text-gray-400">{{ formatDate(transaction.date) }}</td>
            <td class="text-sm py-2 px-4 border-r border-t border-gray-500 text-gray-300">{{ transaction.description }}</td>
            <td 
              class="py-2 px-4 font-medium  border-t border-gray-500 whitespace-nowrap"
              :class="transaction.amount >= 0 ? 'text-green-600' : 'text-red-500/90'"
            >
              {{ formatCurrency(transaction.amount) }}
            </td>
            <td class="py-2 px-4 border-l border-t border-gray-500">
                <ul>

                    <li v-if="!transaction.isSaved">
                        <button @click="UpdateTransaction(transaction.id)" 
                        class="text-base text-green-500/80 hover:underline cursor-pointer">
                            Ubah
                        </button>
                    </li>

                    <li>
                        <button @click="deleteTransaction(transaction.id)"
                        class="text-base text-red-500/80 hover:underline cursor-pointer">
                            Hapus
                        </button>
                    </li>

                </ul>
            </td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="border-gray-500 border-r">&NonBreakingSpace;</td>
                <td class="border-gray-500 border-r">&NonBreakingSpace;</td>
                <td class="border-gray-500 border-r">&NonBreakingSpace;</td>
                <td class="">&NonBreakingSpace;</td>
            </tr>
        </tfoot>
      </table>
    </div>
  </div>

</template>


<script>
import TransactionEditModal from './modal/TransactionEditModal.vue'
import TransactionDeleteModal from './modal/TransactionDeleteModal.vue'

export default {
  components: {
    TransactionEditModal,
    TransactionDeleteModal
  },
  props: {
    transactions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      showConfirmModal: false,
      showEditModal: false,
      selectedTransaction: null
    }
  },
  computed: {
    sortedTransactions() {
      return [...this.transactions].sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        
        //tanggal beda pakek id ngurutinnya id=new date()
        return dateB - dateA || b.id - a.id
      })
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
    formatDate(dateString) {
      const options = { 
        year: '2-digit', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleString('id-ID', options)
    },
    deleteTransaction(id) {
      this.$emit('delete-transaction', id)
    },
    deleteAll() {
      this.$emit('delete-all')
      this.showConfirmModal = false
    },


    openEditModal(transaction) {
      const date = new Date(transaction.date)
      const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString().slice(0, 16)
      
      this.selectedTransaction = {
        ...transaction,
        date: formattedDate,
        amount: Math.abs(transaction.amount)
      }
      this.showEditModal = true
    },
    handleTransactionUpdate(updatedTransaction) {
      const amount = updatedTransaction.type === 'income' 
        ? updatedTransaction.amount 
        : -updatedTransaction.amount
      
      const transactionToUpdate = {
        ...updatedTransaction,
        amount: amount,
        date: new Date(updatedTransaction.date).toISOString()
      }
      
      this.$emit('update-transaction', transactionToUpdate)
      this.showEditModal = false
    },
    UpdateTransaction(id) {
      const transaction = this.transactions.find(t => t.id === id)
      if (transaction) {
        this.openEditModal(transaction)
      }
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
