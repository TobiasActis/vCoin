<template>
    <div>
      <h2>Realizar Venta</h2>
      <form @submit.prevent="realizarVenta">
        <div>
          <label for="criptomoneda">Criptomoneda:</label>
          <select v-model="criptomoneda" id="criptomoneda" required>
            <option value="btc">Bitcoin (BTC)</option>
            <option value="eth">Ethereum (ETH)</option>
          </select>
        </div>
        <div>
          <label for="cantidad">Cantidad:</label>
          <input type="number" v-model="cantidad" id="cantidad" step="0.0001" required>
        </div>
        <div>
          <p>Precio: {{ precio }}</p>
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
  export default {
    data() {
      return {
        criptomoneda: 'btc',
        cantidad: 0,
        precio: 0,
        ventaExitosa: false,
        fechaHoraVenta: null,
      };
    },
    methods: {
      async realizarVenta() {
        // Lógica para obtener el precio de la criptomoneda desde la API
        // Supongamos que la función obtenerPrecioCriptomoneda devuelve el precio
        this.precio = await this.obtenerPrecioCriptomoneda(this.criptomoneda);
  
        // Lógica para realizar la venta y obtener la fecha y hora
        this.fechaHoraVenta = new Date().toLocaleString();
        this.ventaExitosa = true;
  
        // Aquí podrías realizar la request POST a la API para guardar la venta
        // utilizando axios o fetch
      },
      async obtenerPrecioCriptomoneda(criptomoneda) {
        // Simulación de obtener el precio desde la API
        // Aquí deberías realizar la solicitud real a tu API de criptomonedas
        // Estoy usando una función setTimeout para simular una respuesta asíncrona
        return new Promise((resolve) => {
          setTimeout(() => {
            // Supongamos que la API devuelve un precio aleatorio para la criptomoneda
            const precioAleatorio = Math.random() * 10000;
            resolve(precioAleatorio.toFixed(2)); // Redondeamos el precio a 2 decimales
          }, 1000);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente de Venta aquí */
  </style>
  