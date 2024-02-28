<template>
  <div class="container">
    <h2>Realizar Venta</h2>
    <form @submit.prevent="realizarVenta">
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
        <p>Cantidad actual: {{ getWallet[criptomoneda] }}</p>
      </div>
      <div>
        <p>Total a recibir: {{ total }}</p>
      </div>
      <div>
        <button type="submit">Realizar Venta</button>
      </div>
      <div v-if="ventaExitosa">
        <p>Venta exitosa</p>
        <p>Fecha y hora: {{ fechaHoraVenta }}</p>
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
      ventaExitosa: false,
      fechaHoraVenta: "",
    };
  },
  computed: {
    ...mapGetters("criptos", ["getCriptos", "getCriptoPrice"]),
    ...mapGetters("operaciones", ["getWallet"]),
    username() {
      return this.$store.getters.getUsername;
    },
    total() {
      return this.cantidad * this.getPrice(this.criptomoneda).bid;
    },
  },
  methods: {
    ...mapActions("criptos", ["fetchCryptosPrices"]),
    ...mapActions("operaciones", ["newSell"]),

    getPrice(criptoCode) {
      return this.getCriptoPrice(criptoCode) || 0; // Handle missing prices
    },

    async realizarVenta() {
      if (
        this.cantidad > 0 &&
        this.criptomoneda &&
        this.cantidad <= this.getWallet[this.criptomoneda] &&
        this.getWallet[this.criptomoneda] > 0
      ) {
        const datosVenta = {
          user_id: this.username,
          action: "sell",
          cripto_code: this.criptomoneda,
          cripto_amount: this.cantidad,
          money: this.total,
          datetime: new Date(),
        };

        try {
          await this.newSell(datosVenta);
          this.ventaExitosa = true;
          this.fechaHoraVenta = datosVenta.datetime.toLocaleString();
          this.cantidad = 0;
          this.total = 0;
        } catch (error) {
          console.error("Error al realizar la venta", error);
        }
      } else {
        console.error(
          "No posees la criptomoneda seleccionada o no tienes saldo suficiente para realizar la venta."
        );
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
  /* Estilos específicos del componente de Venta aquí */
</style>
  