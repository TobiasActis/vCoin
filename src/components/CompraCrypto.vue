<template>
  <div class="container">
    <h2>Realizar Compra</h2>
    <form @submit.prevent="realizarCompra">
      <div>
        <label for="criptomoneda">Criptomoneda:</label>
        <select class="input" id="criptomoneda" v-model="criptomoneda" required>
          <option value="btc">BTC</option>
          <option value="eth">ETH</option>
          <option value="usdt">USDT</option>
        </select>
      </div>
      <div>
        <label for="cantidad">Cantidad:</label>
        <input
          type="number"
          v-model="cantidad"
          id="cantidad"
          min="0"
          step="0.0001"
          required
        />
      </div>
      <div>
        <p>Precio por unidad: {{ getPrice(criptomoneda).bid }} ARS</p>
      </div>
      <div>
        <p>Total a pagar: {{ total }}</p>
      </div>
      <div>
        <button type="submit">Realizar Compra</button>
      </div>
      <div v-if="compraExitosa">
        <p>Compra exitosa</p>
        <p>Fecha y hora: {{ fechaHoraCompra }}</p>
      </div>
      <div v-if="errorCompra">
        <p>{{ mensajeError }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      criptomoneda: "",
      cantidad: 0,
      precio: 0,
      total: 0,
      compraExitosa: false,
      fechaHoraCompra: "",
      errorCompra: false,
      mensajeError: "",
    };
  },
  computed: {
    ...mapGetters("criptos", ["getCriptos", "getCriptoPrice"]),
    ...mapGetters("operaciones", ["getWallet"]),
    username() {
      return this.$store.getters.getUsername;
    },
    total() {
      return this.precio * this.cantidad;
    },
  },
  methods: {
    ...mapActions("criptos", ["fetchCryptosPrices"]),
    ...mapActions("operaciones", ["newPurchase"]),

    getPrice(criptoCode) {
      return this.getCriptoPrice(criptoCode) || { bid: 0 }; 
    },

    async realizarCompra() {
      if (this.cantidad <= 0 || !this.criptomoneda) {
        this.mostrarError("Cantidad o criptomoneda inválidas");
        return;
      }

      if (this.total > this.getWallet[this.criptomoneda]) {
        this.mostrarError("Saldo insuficiente para realizar la compra");
        return;
      }

      if (!this.username) {
        console.error("Información del usuario no disponible. Inicie sesión antes de realizar una compra.");
        return;
      }

      try {
        const datosCompra = {
          user_id: this.username, 
          action: 'purchase',
          crypto_code: this.criptomoneda,
          crypto_amount: this.cantidad,
          money: this.total.toFixed(2), 
          datetime: new Date(),
        };

        await this.newPurchase(datosCompra);
        this.compraExitosa = true;
        this.fechaHoraCompra = datosCompra.datetime.toLocaleString();
        this.cantidad = 0;
        this.total = 0;
      } catch (error) {
        console.error("Error al realizar la compra", error);
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message || "Error al realizar la compra. Intente nuevamente más tarde.";
          this.mostrarError(errorMessage);
        }
      }
    },

    mostrarError(mensaje) {
      this.errorCompra = true;
      this.mensajeError = mensaje;
      setTimeout(() => {
        this.errorCompra = false;
        this.mensajeError = "";
      }, 5000);
    }
  },

  watch: {
    criptomoneda() {
      this.precio = this.getPrice(this.criptomoneda).bid; // Use precio "bid"
      this.total = this.precio * this.cantidad;
    },
    cantidad() {
      this.total = this.precio * this.cantidad;
    },
  },
  created() {
    this.fetchCryptosPrices();
  },
};
</script>

<style scoped>

</style>
