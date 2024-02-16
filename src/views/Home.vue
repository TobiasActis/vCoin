<template>
    <div class="container mt-4">
      <h2>Mercado Actual</h2>
      <!-- Contenido de la pantalla principal aquí -->
      <Mercados></Mercados>
    </div>
  </template>
  
  <script>
  import Mercados from '@/components/Mercado.vue'
  
  export default {
    components: {
      Mercados,
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos de la pantalla principal aquí */
  </style>
  