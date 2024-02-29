import axios from 'axios';

const API_BASE_URL = 'https://laboratorio3-f36a.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'x-apikey': '60eb09146661365596af552f'},
});

const state = {
  wallet: {
  },
};

const getters = {
  getWallet: (state) => state.wallet,
};

const mutations = {
  updateCriptoAmount(state, { criptoCode, amount, action }) {
    if (!state.wallet[criptoCode]) {
      state.wallet[criptoCode] = 0;
    }

    state.wallet[criptoCode] += (action === 'purchase') ? amount : -amount;

    if (state.wallet[criptoCode] < 0) {
      state.wallet[criptoCode] = 0;
    }
  },

  setWallet(state, newWallet) {
    state.wallet = { ...newWallet };
  }
};

const actions = {
  async newPurchase({ commit }, datosCompra) {
    try {
      console.log('Compra:', datosCompra);
      const response = await apiClient.post('', {
        ...datosCompra,
        action: 'purchase',
      });

      commit('updateCriptoAmount', {
        criptoCode: datosCompra.crypto_code,
        amount: datosCompra.crypto_amount,
        action: 'purchase',
      });

      return response.data;
    } catch (error) {
      console.error('Error al crear la compra:', error);
    }
  },

  async newSell({ commit }, datosVenta) {
    try {
      console.log('Venta:', datosVenta);
      const response = await apiClient.post('', {
        ...datosVenta,
        action: 'sale',
      });

      commit('updateCriptoAmount', {
        criptoCode: datosVenta.crypto_code,
        amount: datosVenta.crypto_amount,
        action: 'sale',
      });

      return response.data;
    } catch (error) {
      console.error('Error al crear la venta:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
