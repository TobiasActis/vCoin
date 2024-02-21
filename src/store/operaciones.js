import axios from 'axios';

const API_BASE_URL = 'https://labor3-d60e.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'},
});

const state = {
  wallet: {},
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
  async newPurchase({ commit }, transactionData) {
    try {
      console.log('Compra:', transactionData);
      const response = await apiClient.post('', {
        ...transactionData,
        action: 'purchase',
      });

      commit('updateCriptoAmount', {
        criptoCode: transactionData.cripto_Code,
        amount: transactionData.cripto_Amount,
        action: 'purchase',
      });

      return response.data;
    } catch (error) {
      console.error('Error al crear la compra:', error);
    }
  },

  async newSell({ commit }, transactionData) {
    try {
      console.log('Venta:', transactionData);
      const response = await apiClient.post('', {
        ...transactionData,
        action: 'sell',
      });

      commit('updateCriptoAmount', {
        criptoCode: transactionData.cripto_Code,
        amount: transactionData.cripto_Amount,
        action: 'sell',
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
