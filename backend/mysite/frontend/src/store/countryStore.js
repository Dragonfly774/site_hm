import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const countryStore = {
    namespaced: true,
    store: () => ({
        countrys: {}

    }),
    getters: {},
    mutations: {
        setCountrys(state, country) {
            state.countrys = country
        },
    },
    actions: {},
    modules: {}
}