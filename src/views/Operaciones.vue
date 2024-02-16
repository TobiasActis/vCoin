<template>
    <div>
      <h1>Operaciones</h1>
      <select v-model="tipoOperacion">
        <option value="compra">Nueva Compra</option>
        <option value="venta">Nueva Venta</option>
      </select>
  
      <component :is="componenteSeleccionado"/>
      
    </div>
  </template>
  
  <script>
  import CompraCrypto from '../components/CompraCrypto.vue';
  import VentaCrypto from '../components/VentaCrypto.vue';
  
  export default {
    data() {
      return {
        tipoOperacion: 'compra',
      };
    },
    computed: {
      componenteSeleccionado() {
        return this.tipoOperacion === 'compra' ? 'CompraCrypto' : 'VentaCrypto';
      },
    },
    components: {
      CompraCrypto,
      VentaCrypto,
    },
  };
  </script>
  