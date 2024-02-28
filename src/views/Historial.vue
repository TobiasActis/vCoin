<template>
  <div class="container">
    <h2>Historial de Movimientos</h2>
    <div v-if="transactions.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Monto</th>
            <th>Fecha y Hora</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction._id">
            <td>{{ transaction.crypto_code }}</td>
            <td>{{ transaction.crypto_amount }}</td>
            <td>{{ transaction.money }} ARS</td>
            <td>{{ formatDateTime(transaction.datetime) }}</td>
            <td>
              <router-link :to="{ name: 'EditarMovimiento', params: { id: transaction._id }}">Editar</router-link>
              <button @click="deleteTransaction(transaction._id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="isLoading">
      <p>Cargando transacciones...</p>
    </div>
    <div v-else>
      <p>No hay movimientos para mostrar</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HistorialMovimientos',
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('operaciones', ['transactions']),
  },
  methods: {
    ...mapActions('operaciones', ['fetchTransactions', 'deleteTransaction']),

    formatDateTime(value) {
      return new Date(value).toLocaleString('es-ES');
    },

    async deleteTransaction(id) {
      if (confirm('¿Estás seguro de eliminar la transacción?')) {
        await this.deleteTransaction(id);
      }
    },

    async fetchTransactions() {
      this.isLoading = true;
      await this.fetchTransactions();
      this.isLoading = false;
    },
  },

  created() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
  /* Estilos específicos del componente HistorialMovimientos */
</style>
