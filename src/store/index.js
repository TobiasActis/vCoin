import {createStore } from 'vuex';
import criptosModulo from './criptos';
import operacionesModulo from './operaciones';

export default createStore({
 
  state: {
    username: null,
    loggedIn: false,
  },
  getters:{
    getUsername: state => state.username,
    getLoggedIn: state => state.loggedIn, 
  },

  mutations: {
    login(state, username) {
      state.username = username;
      state.loggedIn = true;
    },
    logout(state) {
      state.username = '';
      state.loggedIn = false;
    },
  },

  actions: {
    async login({commit},username){
      try{
        commit('login',username);
      }
      catch(error){
        console.error('Error al iniciar sesion:',error)
      }
    },
    async logout({commit}){
      try{
        commit('logout');
      }
      catch(error){
        console.error('Error al cerrar sesion:',error)
      }
    }
  },

  modules: {
    criptos: criptosModulo,
    operaciones: operacionesModulo
  },
});
