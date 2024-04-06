<template>
  <div id="app" class="dark-theme">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.dark-theme {
  background-color: #222;
  color: #fff;
}
</style>