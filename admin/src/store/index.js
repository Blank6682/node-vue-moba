import { createStore } from "vuex";

export default createStore({
  state: {
    //在store中也备份一份token，防止浏览器刷新丢失token
    token: null
  },
  mutations: {
    login (state, data) {
      sessionStorage.setItem("token", data)
      state.token = data
    },
    logout (state) {
      sessionStorage.removeItem("token")
      state.token = null
    }
  },
  actions: {},
  modules: {},
});
