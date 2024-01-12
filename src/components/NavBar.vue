<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">CryptoExchange</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <router-link v-if="!loggedIn" class="nav-item nav-link" to="/login">Iniciar sesión</router-link>
          <button v-if="loggedIn" @click="logout" class="btn btn-outline-danger">Cerrar sesión</button>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.commit('setLoggedIn', false);
      this.$router.push('/login');
    },
  },
};
</script>
