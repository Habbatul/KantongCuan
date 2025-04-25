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

    <!-- modal delete yak  -->
     <teleport to="body">
        <div v-if="showConfirmModal" class="px-8 fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50" @click="showConfirmModal = false">
            <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80" @click.stop>
            <h2 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p class="mb-6 text-sm text-gray-300">
                Apakah kamu yakin ingin menghapus semua transaksi? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div class="flex justify-end space-x-3">
                <button 
                @click="showConfirmModal = false"
                class="bg-gray-600 hover:bg-gray-500 text-sm px-4 py-2 rounded cursor-pointer"
                >
                Batal
                </button>
                <button 
                @click="() => { confirmDelete() }"
                class="bg-red-600 hover:bg-red-500 text-sm px-4 py-2 rounded cursor-pointer"
                >
                Delete
                </button>
            </div>
            </div>
        </div>
    </teleport>


  <div v-if="transactions.length > 0" class="transaction-list rounded-2xl">
    <!-- Scrollable table wrapper -->
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
              <button 
                @click="deleteTransaction(transaction.id)"
                class="text-base text-red-500/80 hover:underline cursor-pointer"
              >
                Hapus
              </button>
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
export default {
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showConfirmModal: false
    }
  },
  computed: {
    sortedTransactions() {
        return [...this.transactions].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            //tanggal beda pakek id ngurutinnya id=new date()
            const diff = dateB.getTime() - dateA.getTime();
            if (diff !== 0) return diff;

            return b.id - a.id;
        });
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value);
    },
    formatDate(dateString) {
        const options = { 
        year: '2-digit', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        };

        return new Date(dateString).toLocaleString('id-ID', options);
    },
    deleteTransaction(id) {
      this.$emit('delete-transaction', id);
    },
    deleteAll() {
      this.$emit('delete-all');
    },
    openConfirmModal() {
      this.showConfirmModal = true
    },
    closeConfirmModal() {
      this.showConfirmModal = false
    },
    confirmDelete() {
      this.deleteAll()
      this.closeConfirmModal()
    },
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
