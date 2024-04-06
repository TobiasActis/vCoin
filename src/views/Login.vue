<template>
  <div class="container">
    <div class="form-container col-md-4">
      <h2 class="mb-4">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">ID Alfanumérico:</label>
          <input type="text" class="form-control" v-model="username" required>
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
  height: 70vh;
}

.form-container {
  background-color: #222;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px #F0B90B;
}

label {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.form-control {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}


.form-control:focus {
  background-color: #000;
  box-shadow: 0 0 0 2px #F0B90B;
}


.form-control,
.form-control:focus {
  color: #fff;
}

.btn {
  background-color: #F0B90B;
  border-color: #F0B90B;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
}

.btn:hover {
  background-color: #FFD749;
  border-color: #FFD749;
}
</style>
