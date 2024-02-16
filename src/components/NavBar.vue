<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">VCoin</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <router-link v-if="!loggedIn" class="nav-item nav-link" to="/login">Iniciar sesión</router-link>
          <router-link v-if="loggedIn" class="nav-item nav-link" to="/operaciones">Nueva Operación</router-link>
          <router-link v-if="loggedIn" class="nav-item nav-link" to="/historial">Historial</router-link>
          <router-link v-if="loggedIn" class="nav-item nav-link" to="/analisis-estado">Análisis de Estado</router-link>
          <router-link v-if="loggedIn" class="nav-item nav-link" to="/analisis-inversiones">Análisis de Inversiones</router-link>
        </ul>
        <button v-if="loggedIn" @click="clicklogout" class="btn btn-outline-danger">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    ...mapActions(['logout']),
    
    async clicklogout() {
      await this.logout();
      this.$router.push('/#');
    }
  },
};
</script>

<style scoped>
/* Estilos específicos de la barra de navegación aquí */
</style>
