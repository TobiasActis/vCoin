<template>
  <div class="container">
    <h2>Análisis de Inversiones</h2>
    <div v-if="cargando">
      <p>Cargando...</p>
    </div>
    <div v-else>
      <div v-for="(resultado, criptomoneda) in resultados" :key="criptomoneda" class="investment-info">
        <h3 style="color: #f0b90b;">{{ criptomoneda }}</h3>
        <p>Resultado: <span :style="{ color: resultado >= 0 ? '#38e260' : '#ff3f4f' }">{{ formatPrice(resultado) }}
            ARS</span></p>
        <hr class="divider">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      cargando: true,
    };
  },
  methods: {
    ...mapActions("operaciones", ["fetchTransactionHistory"]),
    ...mapActions("criptos", ["fetchCryptosPrices"]),

    formatPrice(price) {
      if (!price) return '-';
      const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
      return formattedPrice;
    },
  },
  computed: {
    ...mapState("operaciones", ["transactionHistory"]),
    ...mapGetters("operaciones", ["getWallet"]),
    ...mapGetters("criptos", ["getCriptoPrice"]),
    resultados() {
      const resultados = {};
      for (const transaccion of this.transactionHistory) {
        const precioActual = this.getCriptoPrice(transaccion.crypto_code);
        if (!resultados[transaccion.crypto_code]) {
          resultados[transaccion.crypto_code] = 0;
        }
        if (transaccion.action === 'purchase') {
          resultados[transaccion.crypto_code] -= parseFloat(transaccion.money);
        } else if (transaccion.action === 'sale') {
          resultados[transaccion.crypto_code] += parseFloat(transaccion.money);
        }
      }
      return resultados;
    },
  },
  async created() {
    try {
      await this.fetchTransactionHistory(this.$store.getters.getUsername);
      await this.fetchCryptosPrices();
      this.cargando = false;
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  box-shadow: 0 0 10px #f0bb0b38;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

.investment-info {
  margin-bottom: 20px;
}

.divider {
  border-color: #555;
}

p {
  color: #fff;
}
</style>
