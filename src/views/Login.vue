<template>
  <div class="container">
    <div class="form-container col-md-4">
      <h2 class="mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">ID Alfanumérico:</label>
          <input type="text"  class="form-control" v-model="username" required>
        </div>
        <button type="button" class="btn btn-primary" @click="validateUser">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      error: false,
    };
  },
  methods: {
    ...mapActions(['login']),

    async validateUser() {
      const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;

      if (this.username && usernamePattern.test(this.username)) {
        this.error = false;
        await this.login(this.username);
        this.$router.push('/');
      } else {
        this.error = true;
        this.username = '';
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55vh;
}

.form-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.61);
}

/* Estilos específicos de la pantalla de inicio de sesión aquí */
</style>

