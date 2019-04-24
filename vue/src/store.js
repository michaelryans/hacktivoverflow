import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios' 
import { userInfo } from 'os';

export default new Vuex.Store({
  state: {
    serverUrl: 'http://localhost:3000',
    isLogin: {
      status: true,
      token: "",
      user_id: "",
    },
    list: {
      questions: [],
    }
  },
  mutations: {
    login(state, payload) {
      state.isLogin.status = true
      state.isLogin.user_id = payload._id

    },
    getQuestion(state, payload) {
      state.list.questions = payload
      // console.log('sampai commit get questions')
    },
    logout(state, payload) {
      state.isLogin.status = false
    }
  },
  actions: {
    getQuestion({ commit }) {
      // console.log('dapet nih data masuk then get question -axios -s tore')
      // console.log(this.state.serverUrl)
      axios
      .get(this.state.serverUrl+'/questions')
      .then(({ data }) => {
        // console.log(data)
        // console.log('dapet nih data masuk then get question -axios -s tore')
        commit('getQuestion', data)
      })
      .catch(err => {
        console.log('error di actions get article')
      })
    }
  }
})
