<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">VCoin</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Iniciar sesión</router-link>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/operaciones">Nueva Operación</router-link>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/historial">Historial</router-link>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/estadoActual">Análisis de Estado</router-link>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <router-link class="nav-link" to="/inversiones">Análisis de Inversiones</router-link>
          </li>
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
.navbar-brand:hover {
  color: #ffc107 !important;
}

.navbar-nav .nav-item .nav-link {
  color: #ffffff !important;
}

.navbar-nav .nav-item .nav-link:hover {
  color: #ffc107 !important;
}
</style>
