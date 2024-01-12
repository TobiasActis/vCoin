<template>
  <div class="container mt-4">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login" class="col-md-4">
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" v-model="username" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Lógica de autenticación aquí (simulación)
      this.$store.commit('setLoggedIn', true);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Estilos específicos de la pantalla de inicio de sesión aquí */
</style>
