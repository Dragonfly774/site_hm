import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"


Vue.use(Vuex)

export const bookStore = {
    namespaced: true,
    store: () => ({

        token: localStorage.getItem('token') || ''

    }),
    getters: {
        isLoggedIn: state => !!state.token // в булево значение
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        removeToken(state) {
            state.token = ''
            localStorage.setItem('token', '')
        }
    },
    actions: {
        async login({commit}, {username, password, router}) {
            const response = await axios.post('http://dragonfly774.pythonanywhere.com/api-token-auth/', {
                username: username,
                password: password
            })

            const token = response.data.token
            await commit('setToken', token)
            router.push('/')


        }
    },
    modules: {}
}