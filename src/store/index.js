import { createStore } from 'vuex';

export default createStore({
  state: {
    loggedIn: false,
    alumnoId: "", // Nuevo estado para almacenar el ID del alumno
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setAlumnoId(state, id) {
      state.alumnoId = id;
    },
  },
});
