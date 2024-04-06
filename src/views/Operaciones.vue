<template>
  <div class="operaciones-container">
    <div class="title-wrapper">
      <h1 class="titulo-operaciones">Operaciones</h1>
    </div>
    <div class="select-wrapper">
      <select v-model="tipoOperacion" class="select-operacion">
        <option value="compra">Nueva Compra</option>
        <option value="venta">Nueva Venta</option>
      </select>
    </div>
    <div class="component-wrapper">
      <component :is="componenteSeleccionado" class="componente-operacion" />
    </div>
  </div>
</template>

<script>
import CompraCrypto from '../components/CompraCrypto.vue';
import VentaCrypto from '../components/VentaCrypto.vue';

export default {
  data() {
    return {
      tipoOperacion: 'compra',
    };
  },
  computed: {
    componenteSeleccionado() {
      return this.tipoOperacion === 'compra' ? 'CompraCrypto' : 'VentaCrypto';
    },
  },
  components: {
    CompraCrypto,
    VentaCrypto,
  },
};
</script>

<style scoped>
.operaciones-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.title-wrapper {
  margin-bottom: 20px;
}

.titulo-operaciones {
  color: #fff;
  font-size: 36px;
}

.select-wrapper {
  margin-bottom: 20px;
}

.select-operacion {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #F0B90B;
  border-radius: 4px;
  background-color: #222;
  color: #fff;
}

.select-operacion:focus {
  outline: none;
  border-color: #ffc107;
}

.component-wrapper {
  border: 2px solid #F0B90B;
  border-radius: 4px;
  background-color: #222;
  padding: 20px;
}

.componente-operacion {
  color: #fff;
}
</style>
