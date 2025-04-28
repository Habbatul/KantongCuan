<template>
  <div>
    Harga Tether Gold: {{ harga }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      harga: 0
    }
  },
  mounted() {
    this.getHarga();
  },
  methods: {
    async getHarga() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=idr');
        this.harga = response.data['tether-gold'].idr;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
