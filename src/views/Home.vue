<template>
    <div class="container mt-4">
      <h2>Mercado Actual</h2>
      <!-- Contenido de la pantalla principal aquí -->
      <Mercados></Mercados>
      <router-link to="/operaciones" class="btn">Operaciones Crypto</router-link>
    </div>
  </template>
  
  <script>
  import Mercados from '@/components/Mercado.vue'
  import Operaciones from '@/views/Operaciones.vue'
  
  export default {
    components: {
      Mercados,
      Operaciones,
    },
  };
  </script>
  
  <style scoped>
  .btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
  </style>
  