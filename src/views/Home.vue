<template>
  <div class="container mt-4">
    <h2 class="titulo-mercado">Mercado Actual</h2>
    <Mercados></Mercados>
    <router-link to="/operaciones" class="btn-operaciones">Operaciones Crypto</router-link>
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
.titulo-mercado {
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
}

.btn-operaciones {
  display: inline-block;
  padding: 10px 20px;
  background-color: #F0B90B;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.btn-operaciones:hover {
  background-color: #ffc107;
}
</style>
