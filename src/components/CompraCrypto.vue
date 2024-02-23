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
        >
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
    };
  },
  computed: {
    ...mapGetters("criptos", ["getCriptos", "getCriptoPrice"]),
    ...mapGetters(["username"]),
    ...mapGetters("operaciones", ["getWallet"]),
    total() {
      return this.cantidad * this.getPrice(this.criptomoneda).bid;
    },
  },
  methods: {
    ...mapActions("criptos", ["fetchCryptosPrices"]),
    ...mapActions("operaciones", ["newPurchase"]),

    getPrice(criptoCode) {
      return this.getCriptoPrice(criptoCode) || 0; // Handle missing prices
    },

    async realizarCompra() {
      if (this.cantidad > 0 && this.criptomoneda && this.total <= this.getWallet[this.criptomoneda]) {
        const datosCompra = {
          user: this.username,
          action: "purchase",
          criptoCode: this.criptomoneda,
          criptoAmount: this.cantidad,
          datetime: new Date(),
        };

        // Validar saldo disponible antes de la compra
        if (this.wallet[datosCompra.criptoCode] < datosCompra.criptoAmount) {
          console.error(
            "Saldo insuficiente para realizar la compra",
            `Saldo disponible: ${this.wallet[datosCompra.criptoCode]} ${datosCompra.criptoCode}`
          );
          return; // Evitar la compra si no hay saldo
        }

        try {
          await this.newPurchase(datosCompra);
          this.compraExitosa = true;
          this.fechaHoraCompra = datosCompra.datetime.toLocaleString();
          this.cantidad = 0;
          this.total = 0;
        } catch (error) {
          console.error("Error al realizar la compra", error);
        }
      } else {
        console.error("Cantidad o criptomoneda inválidas, o saldo insuficiente");
      }
    },
  },
  watch: {
    criptomoneda() {
      this.precio = this.getPrice(criptomoneda).bid; // Use precio "bid"
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