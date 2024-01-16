import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import Mercado from "./components/Mercado.vue"; // Ajusta la ruta según tu estructura de carpetas

import 'bootstrap/dist/css/bootstrap.min.css';

// Configura Axios con axios-cors-proxy
axios.defaults.baseURL = 'https://criptoya.com/api'; // Ajusta la URL según la API

// Agrega Axios a la instancia de Vue para que esté disponible en toda la aplicación
const app = createApp(App);
app.use(store);
app.use(router);
app.provide('axios', axios);
app.component('Mercado', Mercado); // Registra el componente Mercados globalmente
app.mount("#app");
