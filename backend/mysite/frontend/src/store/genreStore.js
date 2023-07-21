import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const genreStore = {
    namespaced: true,
    store: () => ({
        genres: {}

    }),
    getters: {},
    mutations: {
        setGenres(state, genre) {
            state.genres = genre
        },
    },
    actions: {},
    modules: {}
}