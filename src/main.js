import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import Mercado from "./components/Mercado.vue";


import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL = 'https://criptoya.com/api';

const app = createApp(App);
app.use(store);
app.use(router);
app.provide('axios', axios);
app.component('Mercado', Mercado);
app.mount("#app");
