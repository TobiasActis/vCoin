import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Operaciones from '@/views/Operaciones.vue';
import Historial from '@/views/Historial.vue';
import store from '@/store';  


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/operaciones',
    name: 'Operaciones',
    component: Operaciones, 
  },
  {
    path: '/historial',
    name: 'Historial',
    component: Historial, 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.loggedIn) {
    next('/login');
  } else if(to.meta.requiresGuest && store.state.loggedIn){
    next('/#');
  }
  else{
    next();
  }
});

export default router;
