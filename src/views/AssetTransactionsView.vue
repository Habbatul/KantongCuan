<template>
  <div class="transactions-view max-w-4xl mx-auto">
    <div class="flex items-center mb-6 ml-2">
      <router-link to="/assets" class="mr-2 text-xl font-medium text-[#30ab73] hover:text-green-200 transition-colors underline underline-offset-2">Asset</router-link>
      <h1 class="text-2xl font-bold text-[#35d58d]">/ Transaksi Asset</h1>
    </div>

    <div v-if="asset">

      <div class="flex-row space-y-2 items-center mb-6 mx-2 border p-3">
        <div>
          <h2 class="text-[1.4rem] font-semibold text-[#37dd92]">{{ asset.name }}</h2>
        </div>
        <div class="w-full flex items-center">

            <span class="text-lg font-bold text-[#2db578d3]">
            {{ formatCurrency(asset.currentBalance) }}
            </span>

            <button v-if="asset.isAllowChange" type="submit"  class="text-sm ml-2 py-1 px-2 cursor-pointer btn-import flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-600 text-[#35d58d] hover:text-green-300 rounded-lg transition-colors duration-200 border border-[#4dd598]/80" @click="applyChangeCurrentBalance">    
                <span class="relative bottom-[0.05rem]">Save</span>
            </button>

        </div>
      </div>


      <TransactionForm @transaction-added="addTransaction" />


      <div>

        <TransactionList :transactions="asset.transactions" 
          @delete-transaction="handleDelete"
         @delete-all="handleDeleteAll"
        />
      </div>
    </div>

    <!-- <div v-else class="text-center py-12 text-gray-400">
      <p>Asset tidak ditemukan</p>
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import TransactionForm from '@/components/TransactionForm.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    TransactionForm,
    TransactionList
  },
  setup(props) {
    const asset = ref(null)

    onMounted(() => {
      const savedAssets = localStorage.getItem('assets')
      if (savedAssets) {
        const assets = JSON.parse(savedAssets)
        asset.value = assets.find(a => a.id.toString() === props.id)
      }
    })

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(value)
    }

    const addTransaction = (transactionData) => {
      if (!asset.value) return
      
      const amount = transactionData.type === 'income' 
        ? transactionData.amount 
        : -transactionData.amount
      
      asset.value.transactions.push({
        id: Date.now(),
        date: transactionData.date,
        description: transactionData.description,
        amount: amount,
        type: transactionData.type,
        isSaved: transactionData.isSaved
      })
      
      asset.value.isAllowChange = true
      asset.value.currentBalance += amount
      saveData()
    }

    const handleDelete = (id) => {
        if (!asset.value) return;

        const transaction = asset.value.transactions.find(tx => tx.id === id);
        console.log(transaction.isSaved)
        if (!transaction.isSaved) {
            asset.value.currentBalance -= transaction.amount;
        }

        asset.value.transactions = asset.value.transactions.filter(tx => tx.id !== id);

        saveData();
    }


    const applyChangeCurrentBalance = () => {
        asset.value.isAllowChange = false
        console.log(asset.value.isAllowChange)
        asset.value.transactions.forEach(tx => {
            tx.isSaved = true;
        });
        saveData()
    }


    const handleDeleteAll = () => {
      if (!asset.value) return
      asset.value.transactions = []
      saveData()
    }

    const saveData = () => {
      const savedAssets = localStorage.getItem('assets')
      if (savedAssets) {
        const assets = JSON.parse(savedAssets)
        const index = assets.findIndex(a => a.id.toString() === props.id)
        if (index !== -1) {
          assets[index] = asset.value
          localStorage.setItem('assets', JSON.stringify(assets))
        }
      }
    }

    return {
      asset,
      formatCurrency,
      addTransaction,
      handleDelete,
      handleDeleteAll,
      applyChangeCurrentBalance
    }
  },
    watch: {
    asset(val) {
      if (!val) {
        this.$router.push({ name: 'assets' });
      }
    }
  },
  mounted() {
    if (!this.asset) {
      this.$router.push({ name: 'assets' });
    }
  },
}
</script>


<style scoped>
.transactions-view {
  min-height: calc(100vh - 100px);
}
</style>