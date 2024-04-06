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
        <input type="number" v-model="cantidad" id="cantidad" min="0" step="0.0001" required class="input" />
      </div>
      <div>
        <p>Precio por unidad: {{ formatPrice(getPrice(criptomoneda).bid) }} ARS</p>
        <p>Cantidad actual: {{ getWallet[criptomoneda] }}</p>
      </div>
      <div>
        <p>Total a recibir: {{ formatPrice(total) }}</p>
      </div>
      <div>
        <button type="submit">Realizar Venta</button>
      </div>
      <div v-if="ventaExitosa" class="success-message">
        <p>Venta exitosa</p>
        <p>Fecha y hora: {{ fechaHoraVenta }}</p>
      </div>
      <div v-if="errorVenta" class="error-message">
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
      ventaExitosa: false,
      errorVenta: false,
      mensajeError: "",
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
      return this.getCriptoPrice(criptoCode) || { bid: 0 };
    },
    formatPrice(price) {
      if (!price) return '-';
      const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
      return formattedPrice;
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
          action: "sale",
          crypto_code: this.criptomoneda,
          crypto_amount: this.cantidad,
          money: this.total.toFixed(2),
          datetime: new Date(),
        };

        try {
          await this.newSell(datosVenta);
          this.ventaExitosa = true;
          this.fechaHoraVenta = datosVenta.datetime.toLocaleString();
          this.cantidad = 0;
          this.mostrarExito("Venta realizada con éxito");
        } catch (error) {
          console.error("Error al realizar la venta", error);
          this.mostrarError("Error al realizar la venta. Por favor, inténtelo de nuevo más tarde.");
        }
      } else {
        console.error(
          "No posees la criptomoneda seleccionada o no tienes saldo suficiente para realizar la venta."
        );
        this.mostrarError("No posees suficiente saldo para realizar la venta");
      }
    },

    mostrarError(mensaje) {
      this.errorVenta = true;
      this.mensajeError = mensaje;
      setTimeout(() => {
        this.errorVenta = false;
        this.mensajeError = "";
      }, 5000);
    },

    mostrarExito(mensaje) {
      this.ventaExitosa = true;
      setTimeout(() => {
        this.ventaExitosa = false;
      }, 5000);
    },
  },
  watch: {
    criptomoneda() {
      this.cantidad = 0;
    },
  },
  created() {
    this.fetchCryptosPrices();
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  box-shadow: 0 0 10px #f0bb0b18;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #fff;
}

.input {
  width: 100%;
  padding: 10px;
  background-color: #333333;
  color: #fff;
  border: 1px solid #888;
  border-radius: 5px;
}

.input:focus {
  outline: none;
  border-color: #f0b90b;
  box-shadow: 0 0 5px #f0b90b;
}

p {
  margin: 0;
  color: #fff;
}

button {
  padding: 10px 20px;
  background-color: #f0b90b;
  color: #222;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ffd749;
}

.success-message,
.error-message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.success-message {
  background-color: #38e260;
}

.error-message {
  background-color: #ff3f4f;
}
</style>
