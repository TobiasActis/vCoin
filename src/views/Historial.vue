<template>
  <div class="container">
    <h2>Historial de Movimientos</h2>
    <div v-if="cargando">
      <p>Cargando historial...</p>
    </div>
    <div v-else-if="transactionHistory && transactionHistory.length === 0">
      <p>No hay movimientos registrados.</p>
    </div>
    <div v-else>
      <table class="dark-table">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Acción</th>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimiento in transactionHistory" :key="movimiento._id">
            <td>{{ formatDateTime(movimiento.datetime) }}</td>
            <td>{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
            <td>{{ movimiento.crypto_code }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>{{ formatPrice(movimiento.money) }} <br /> ARS</td>
            <td>
              <button @click="editarMovimiento(movimiento)" class="edit-button">
                <i class="bi bi-pencil-fill"></i>
                <span class="button-label">Editar</span>
              </button>
              <button @click="borrarMovimiento(movimiento._id)" class="delete-button">
                <i class="bi bi-trash-fill"></i>
                <span class="button-label">Borrar</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="mostrandoFormularioEdicion" class="edit-form">
      <h3>Editar Movimiento</h3>
      <form @submit.prevent="guardarCambios" class="dark-form">
        <label>Fecha y Hora:</label>
        <input type="datetime-local" v-model="movimientoEditado.datetime" required class="input">
        <label>Acción:</label>
        <select v-model="movimientoEditado.action" required class="input">
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
        <label>Criptomoneda:</label>
        <input type="text" v-model="movimientoEditado.crypto_code" required class="input">
        <label>Cantidad:</label>
        <input type="number" v-model="movimientoEditado.crypto_amount" required class="input">
        <label>Monto:</label>
        <input type="number" v-model="movimientoEditado.money" required class="input">
        <button type="submit" class="submit-button">Guardar Cambios</button>
        <button @click="cancelarEdicion" class="cancel-button">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { format } from 'date-fns';

export default {
  data() {
    return {
      cargando: true,
      mostrandoFormularioEdicion: false,
      movimientoEditado: {
        _id: '',
        datetime: '',
        action: '',
        crypto_code: '',
        crypto_amount: 0,
        money: 0
      }
    };
  },
  computed: {
    ...mapState("operaciones", ["transactionHistory"])
  },
  methods: {
    ...mapActions("operaciones", ["fetchTransactionHistory", "deleteTransaction", "updateTransaction"]),
    async obtenerHistorial() {
      const username = this.$store.getters.getUsername;
      if (!username) {
        console.log("Usuario no logueado. No se puede obtener el historial.");
        return;
      }
      this.cargando = true;
      try {
        await this.fetchTransactionHistory(username);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      } finally {
        this.cargando = false;
      }
    },
    formatPrice(price) {
      if (!price) return '-';
      const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
      return formattedPrice;
    },
    async borrarMovimiento(transactionId) {
      try {
        await this.deleteTransaction(transactionId);
        console.log('Movimiento borrado correctamente');
      } catch (error) {
        console.error('Error al borrar el movimiento:', error);
      }
    },
    async editarMovimiento(movimiento) {
      this.mostrandoFormularioEdicion = true;
      this.movimientoEditado = { ...movimiento };
    },
    async guardarCambios() {
      try {
        await this.updateTransaction(this.movimientoEditado);
        console.log('Cambios guardados correctamente');
        this.mostrandoFormularioEdicion = false;
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      }
    },
    cancelarEdicion() {
      this.mostrandoFormularioEdicion = false;
    },
    formatDateTime(datetime) {
      return format(new Date(datetime), 'dd/MM/yyyy HH:mm:ss');
    }
  },
  created() {
    this.obtenerHistorial();
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

table.dark-table {
  width: 100%;
  border-collapse: collapse;
}

.dark-table th,
.dark-table td {
  padding: 10px;
  border-bottom: 1px solid #555;
}

.dark-table th {
  text-align: left;
  background-color: #333;
  color: #fff;
}

.dark-table tbody tr:hover {
  background-color: #333;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #f0b90b;
  color: #222;
}

.delete-button {
  background-color: #ff3f4f;
  color: #fff;
}

.button-label {
  margin-left: 5px;
}

.bi {
  vertical-align: middle;
}

.edit-form {
  padding: 20px;
  margin-top: 20px;
  background-color: #333;
  border-radius: 8px;
}

.input {
  width: 100%;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: 1px solid #888;
  border-radius: 5px;
}

.submit-button,
.cancel-button {
  margin-top: 10px;
}

.submit-button {
  background-color: #38e260;
}

.cancel-button {
  background-color: #ff3f4f;
}

.dark-form label {
  color: #fff;
}
</style>
