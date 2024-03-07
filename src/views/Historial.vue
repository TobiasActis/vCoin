<template>
  <div class="container">
    <h2>Historial de Movimientos</h2>
    <!-- Contenido del historial aquí... -->
    <div v-if="cargando">
      <p>Cargando historial...</p>
    </div>
    <div v-else-if="transactionHistory && transactionHistory.length === 0">
      <p>No hay movimientos registrados.</p>
    </div>
    <div v-else>
      <table class="table">
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
            <td>{{ movimiento.datetime }}</td>
            <td>{{ movimiento.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
            <td>{{ movimiento.crypto_code }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>{{ movimiento.money }} ARS</td>
            <td>
              <button @click="editarMovimiento(movimiento)">Editar</button>
              <button @click="borrarMovimiento(movimiento._id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Formulario de edición -->
    <div v-if="mostrandoFormularioEdicion">
      <h3>Editar Movimiento</h3>
      <form @submit.prevent="guardarCambios">
        <label>Fecha y Hora:</label>
        <input type="datetime-local" v-model="movimientoEditado.datetime" required>
        <label>Acción:</label>
        <select v-model="movimientoEditado.action" required>
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
        <label>Criptomoneda:</label>
        <input type="text" v-model="movimientoEditado.crypto_code" required>
        <label>Cantidad:</label>
        <input type="number" v-model="movimientoEditado.crypto_amount" required>
        <label>Monto:</label>
        <input type="number" v-model="movimientoEditado.money" required>
        <button type="submit">Guardar Cambios</button>
        <button @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
    }
  },
  created() {
    this.obtenerHistorial();
  },
};
</script>

<style scoped>
/* Estilos específicos del componente de Historial aquí */
</style>
