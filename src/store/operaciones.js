import axios from 'axios';

const API_BASE_URL = 'https://laboratorio3-5459.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'x-apikey': '64a57c2b86d8c50fe6ed8fa5' },
});

const state = {
  wallet: {},
  transactionHistory: [],
};

const getters = {
  getWallet: state => state.wallet,
  getTransactionHistory: state => state.transactionHistory,
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
  },

  setTransactionHistory(state, transactionHistory) {
    state.transactionHistory = transactionHistory;
  },

  removeTransaction(state, transactionId) {
    state.transactionHistory = state.transactionHistory.filter(transaction => transaction._id !== transactionId);
  },

  updateTransaction(state, updatedTransaction) {
    state.transactionHistory = state.transactionHistory.map(transaction => {
      if (transaction._id === updatedTransaction._id) {
        return updatedTransaction;
      }
      return transaction;
    });
  },
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

  async fetchTransactionHistory({ commit }, username) {
    try {
      const response = await apiClient.get('', {
        params: {
          q: JSON.stringify({ "user_id": username })
        }
      });
      commit('setTransactionHistory', response.data);
    } catch (error) {
      console.error('Error al obtener el historial de transacciones:', error);
      throw error;
    }
  },

  async deleteTransaction({ commit }, transactionId) {
    try {
      await apiClient.delete(`/${transactionId}`);
      commit('removeTransaction', transactionId);
    } catch (error) {
      console.error('Error al borrar la transacción:', error);
      throw error;
    }
  },

  async updateTransaction({ commit }, updatedTransaction) {
    try {
      await apiClient.put(`/${updatedTransaction._id}`, updatedTransaction);
      commit('updateTransaction', updatedTransaction);
    } catch (error) {
      console.error('Error al actualizar la transacción:', error);
      throw error;
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
