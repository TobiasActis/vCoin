<template>
  <div class="crypto-prices-horizontal">
    <div class="crypto-card" v-for="(crypto, code) in criptos" :key="code">
      <div class="crypto-info">
        <h5 class="crypto-name">{{ getCodeName(code) }}</h5>
        <div class="price-details">
          <p class="price-label">Compra (ARS):<br/> $ <span class="price-value">{{ formatPrice(crypto?.totalAsk) }}</span></p>
          <p class="price-label">Venta (ARS):<br/> $ <span class="price-value">{{ formatPrice(crypto?.totalBid) }}</span></p>
          <p class="last-update">
            Última actualización:
            <span class="update-time">{{ formatDate(crypto?.time * 1000) }} h</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('criptos', ['getCriptoPrice']),
    criptos() {
      return {
        btc: this.getCriptoPrice('btc'),
        eth: this.getCriptoPrice('eth'),
        usdt: this.getCriptoPrice('usdt'),
      };
    }
  },
  methods: {
    ...mapActions('criptos', ['fetchCryptosPrices']),
    getCodeName(code) {
      const codeMappings = {
        btc: 'Bitcoin',
        eth: 'Ethereum',
        usdt: 'USDT',
      };
      return codeMappings[code] || 'Desconocido';
    },
    formatPrice(price) {
      if (!price) return '-';
      return parseFloat(price).toLocaleString('es-AR', { minimumFractionDigits: 2 });
    },
    formatDate(timestamp) {
      if (!timestamp) return '-';
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  },
  created() {
    this.fetchCryptosPrices();
  }
};
</script>

<style scoped>
.crypto-prices-horizontal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
}

.crypto-card {
  background-color: #222; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  text-align: center;
  width: 250px;
}

.crypto-info {
  margin-top: 10px;
}

.crypto-name {
  font-size: 18px;
  color: #fff; 
  margin-bottom: 5px;
}

.price-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price-label {
  font-size: 16px;
  margin: 0;
  color: #fff; 
}

.price-value {
  color: #F0B90B; 
}

.last-update {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.update-time {
  color: #F0B90B; 
}
</style>
