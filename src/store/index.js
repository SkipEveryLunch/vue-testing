import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    DISCARD_USER: (state) => {
      state.user = null;
    },
  },
  actions: {
    setUser: ({ commit }, user) => {
      commit('SET_USER', user);
    },
    discardUser: ({ commit }) => {
      commit('DISCARD_USER');
    },
  },
});
