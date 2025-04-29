<template>
  <teleport to="body">
    <div 
      v-if="show" 
      class="px-8 fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50" 
      @click="$emit('close')"
    >
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
        <p class="mb-6 text-sm text-gray-300">
          <slot>Apakah kamu yakin ingin menghapus semua transaksi? Tindakan ini tidak bisa dibatalkan.</slot>
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="$emit('close')"
            class="bg-gray-600 hover:bg-gray-500 text-sm px-4 py-2 rounded cursor-pointer"
          >
            Batal
          </button>
          <button 
            @click="$emit('confirm')"
            class="bg-red-600 hover:bg-red-500 text-sm px-4 py-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  }
}
</script>