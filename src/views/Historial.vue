<template>
    <div>
      <h2>Historial de Movimientos</h2>
      <div v-if="movimientos.length === 0">
        <p>No hay movimientos registrados.</p>
      </div>
      <div v-else>
        <div v-for="movimiento in movimientos" :key="movimiento._id" class="movimiento-item">
          <p>Criptomoneda: {{ movimiento.crypto_code }}</p>
          <p>Cantidad: {{ movimiento.crypto_amount }}</p>
          <p>Monto: {{ movimiento.money }}</p>
          <p>Tipo de movimiento: {{ movimiento.action }}</p>
          <p>Fecha y Hora: {{ formatearFechaHora(movimiento.datetime) }}</p>
          <router-link :to="{ name: 'DetalleMovimiento', params: { id: movimiento._id }}">Detalles</router-link>
          <button @click="editarMovimiento(movimiento._id)">Editar</button>
          <button @click="borrarMovimiento(movimiento._id)">Borrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        movimientos: [],
      };
    },
    created() {
      this.obtenerMovimientos();
    },
    methods: {
      async obtenerMovimientos() {
        // Lógica para obtener movimientos desde la API
        // Utiliza axios o fetch para hacer la solicitud GET
        const userId = this.$store.getters.getAlumnoId; // Obtén el ID del usuario desde Vuex
        try {
          const response = await axios.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${userId}"}`);
          this.movimientos = response.data;
        } catch (error) {
          console.error('Error al obtener movimientos:', error);
        }
      },
      formatearFechaHora(fechaHora) {
        // Lógica para formatear la fecha y hora según tus necesidades
        // Puedes utilizar bibliotecas como moment.js si lo prefieres
        const fecha = new Date(fechaHora);
        return fecha.toLocaleString();
      },
      editarMovimiento(idMovimiento) {
        // Lógica para redirigir a la página de edición con el ID del movimiento
        this.$router.push({ name: 'EditarMovimiento', params: { id: idMovimiento } });
      },
      borrarMovimiento(idMovimiento) {
        // Lógica para borrar el movimiento desde la API
        // Utiliza axios o fetch para hacer la solicitud DELETE
        if (confirm('¿Estás seguro de que deseas borrar este movimiento?')) {
          // Realiza la solicitud DELETE y luego actualiza la lista de movimientos
          // Puedes implementar esta lógica según tus necesidades
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente de HistorialMovimientos aquí */
  .movimiento-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  