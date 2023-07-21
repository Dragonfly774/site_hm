import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const authorStore = {
    namespaced: true,
    store: () => ({
        authors: {}

    }),
    getters: {},
    mutations: {
        setAuthors(state, author) {
            state.authors = author
        },
    },
    actions: {},
    modules: {}
}