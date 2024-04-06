<template>
  <div class="container">
    <h2>Análisis del Estado Actual</h2>
    <div v-if="cargando">
      <p>Cargando...</p>
    </div>
    <div v-else>
      <div v-for="(info, index) in estadoFinanciero" :key="index" class="crypto-info">
        <h3>{{ info.criptomoneda }}</h3>
        <p>Cantidad: {{ info.cantidad }}</p>
        <p>Dinero: {{ formatPrice(info.dinero) }} ARS</p>
        <hr class="divider">
      </div>
      <h3>Total</h3>
      <p>Total: $ {{ formatPrice(calcularTotal()) }} ARS</p>
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
  computed: {
    ...mapState("operaciones", ["transactionHistory"]),
    ...mapGetters("operaciones", ["getWallet"]),
    estadoFinanciero() {
      const estado = {};
      for (const transaccion of this.transactionHistory) {
        if (!estado[transaccion.crypto_code]) {
          estado[transaccion.crypto_code] = {
            criptomoneda: transaccion.crypto_code,
            cantidad: 0,
            dinero: 0
          };
        }
        if (transaccion.action === 'purchase') {
          estado[transaccion.crypto_code].cantidad += parseFloat(transaccion.crypto_amount);
          estado[transaccion.crypto_code].dinero += parseFloat(transaccion.money);
        } else if (transaccion.action === 'sale') {
          estado[transaccion.crypto_code].cantidad -= parseFloat(transaccion.crypto_amount);
          estado[transaccion.crypto_code].dinero -= parseFloat(transaccion.money);
        }
      }
      return Object.values(estado);
    },
  },
  async created() {
    try {
      await this.fetchTransactionHistory(this.$store.getters.getUsername);
      this.cargando = false;
    } catch (error) {
      console.error('Error:', error);
    }
  },
  methods: {
    ...mapActions("operaciones", ["fetchTransactionHistory"]),
    calcularTotal() {
      let total = 0;
      for (const info of this.estadoFinanciero) {
        total += info.dinero;
      }
      return total.toFixed(2);
    },

    formatPrice(price) {
      if (!price) return '-';
      const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
      return formattedPrice;
    },
  }
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

.crypto-info {
  margin-bottom: 20px;
}

.crypto-info h3 {
  color: #f0b90b;
}

.divider {
  border-color: #555;
}

p {
  color: #fff;
}
</style>
