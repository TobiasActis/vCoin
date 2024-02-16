<template>
    <div>
      <h2>Realizar Compra</h2>
      <form @submit.prevent="realizarCompra">
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
  export default {
    data() {
      return {
        criptomoneda: 'btc',
        cantidad: 0,
        precio: 0,
        compraExitosa: false,
        fechaHoraCompra: null,
      };
    },
    methods: {
      async realizarCompra() {
        // Lógica para obtener el precio de la criptomoneda desde la API
        // Supongamos que la función obtenerPrecioCriptomoneda devuelve el precio
        this.precio = await this.obtenerPrecioCriptomoneda(this.criptomoneda);
  
        // Lógica para realizar la compra y obtener la fecha y hora
        this.fechaHoraCompra = new Date().toLocaleString();
        this.compraExitosa = true;
  
        // Aquí podrías realizar la request POST a la API para guardar la compra
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
  /* Estilos específicos del componente de Compra aquí */
  </style>
  