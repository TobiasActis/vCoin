<template>
  <div class="container">
    <h2>Análisis de Inversiones</h2>
    <div v-if="cargando">
      <p>Cargando...</p>
    </div>
    <div v-else>
      <div v-for="(resultado, criptomoneda) in resultados" :key="criptomoneda">
        <h3>{{ criptomoneda }}</h3>
        <p>Resultado: $ {{ resultado }}</p>
        <hr>
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
  },
  computed: {
    ...mapState("operaciones", ["transactionHistory"]),
    ...mapGetters("operaciones", ["getWallet"]),
    ...mapGetters("criptos", ["getCriptoPrice"]), // Importante agregar esta línea
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
      await this.fetchCryptosPrices(); // Llama al método para cargar los precios de las criptomonedas
      this.cargando = false;
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
</script>

<style scoped>
/* Estilos específicos del componente de Análisis de Inversiones aquí */
</style>
