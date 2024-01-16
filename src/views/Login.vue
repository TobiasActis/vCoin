<template>
  <div class="container">
    <div class="form-container col-md-4">
      <h2 class="mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="alumnoId">ID Alfanumérico:</label>
          <input type="text" v-model="alumnoId" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alumnoId: "",
    };
  },
  methods: {
    login() {
      // Validar si el ID del alumno es alfanumérico (puedes ajustar la validación según tus necesidades)
      if (/^[a-zA-Z0-9]+$/.test(this.alumnoId)) {
        // Almacenar el ID del alumno en Vuex
        this.$store.commit('setAlumnoId', this.alumnoId);
        // Simular lógica de autenticación (puedes ajustar según tus necesidades)
        this.$store.commit('setLoggedIn', true);
        this.$router.push('/');
      } else {
        // Mostrar mensaje de error si el ID no es válido
        alert("El ID debe ser alfanumérico");
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

