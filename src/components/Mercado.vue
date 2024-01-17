<template>
  <div class="row">
    <div v-for="(cotizacion, coin) in cotizaciones" :key="coin" class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ coin }}</h5>
          <p class="card-text" v-if="cotizacion">Precio de compra: {{ cotizacion.totalAsk }}</p>
          <p class="card-text" v-if="cotizacion">Precio de venta: {{ cotizacion.totalBid }}</p>
          <p class="card-text" v-if="cotizacion">Última actualización: {{ new Date(cotizacion.time * 1000).toLocaleString() }}</p>
          <p class="card-text" v-else>Error al obtener datos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const cotizaciones = ref({});

    const obtenerDatosCotizaciones = async () => {
      try {
        const response = await axios.get('https://criptoya.com/api/btc/ars/0.1');

        // Asumimos que la respuesta tiene la estructura esperada
        for (const [coin, datos] of Object.entries(response.data)) {
          const cotizacion = {
            totalAsk: datos.totalAsk,
            totalBid: datos.totalBid,
            time: datos.time,
          };

          cotizaciones.value[coin] = cotizacion;
        }
      } catch (error) {
        console.error('Error al obtener datos de cotizaciones:', error);
      }
    };

    onMounted(() => {
      obtenerDatosCotizaciones();
    });

    return {
      cotizaciones,
      obtenerDatosCotizaciones,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos del componente de Mercado aquí */
</style>
