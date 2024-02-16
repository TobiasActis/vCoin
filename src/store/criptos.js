import axios from 'axios';

const API_BASE_URL = 'https://criptoya.com/api';

const state = {
  criptos: {
    btc: null,
    eth: null,
    usdt: null,
  }
};

const getters = {
  getCriptoPrice: (state) => (criptoCode) => state.criptos[criptoCode]
};

const mutations = {
  setCripto(state, { criptoCode, data }) {
    state.criptos[criptoCode] = data;
  }
};

const actions = {
  async fetchCryptosPrices({ commit, state }) {
    try {
      for (const criptoCode in state.criptos) {
        const criptoResponse = await axios.get(`${API_BASE_URL}/binance/${criptoCode}/ars/0.5`);
        commit('setCripto', { criptoCode, data: criptoResponse.data });
      }
    } catch (error) {
      console.log('Error fetching cryptocurrency prices:', error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

