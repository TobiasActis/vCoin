<template>
  <div class="row">
    <div v-for="(cotizacion, proveedor) in cotizaciones" :key="proveedor" class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ proveedor }}</h5>
          <p class="card-text">Precio de compra: {{ cotizacion.totalAsk }}</p>
          <p class="card-text">Precio de venta: {{ cotizacion.totalBid }}</p>
          <p class="card-text">Última actualización: {{ new Date(cotizacion.time * 1000).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cotizaciones: {},
    };
  },
  mounted() {
    this.obtenerDatosCotizaciones();
  },
  methods: {
  async obtenerDatosCotizaciones() {
    try {
      const response = await axios.get('https://criptoya.com/api/btc/ars/0.1');
      const proveedor = Object.keys(response.data)[0];
      const cotizacion = {
        totalAsk: response.data[proveedor].totalAsk,
        totalBid: response.data[proveedor].totalBid,
        time: response.data[proveedor].time,
      };

      // Asignación directa para hacer que cotizaciones sea reactiva
      this.$data.cotizaciones[proveedor] = cotizacion;
    } catch (error) {
      console.error('Error al obtener datos de cotizaciones:', error);
    }
  },
},
};
</script>

<style scoped>
/* Estilos específicos del componente de Mercados aquí */
</style>
