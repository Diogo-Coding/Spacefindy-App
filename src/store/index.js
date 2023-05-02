import { createStore } from 'vuex'
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
  state: {
    user: null
  },
  getters: {
    isLoggedIn: state => {
      return state.user !== null
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    login(context, user) {
      context.commit('SET_USER',user)
    },
    logout(context) {
      context.commit('SET_USER', null)
    }
  },
  modules: {
  },
  plugins: [createMultiTabState({
    statesPaths: ['user'],
  })],
})
