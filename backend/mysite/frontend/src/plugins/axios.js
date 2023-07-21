import axios from "axios";

// axios.defaults.baseURL = 'http://dragonfly774.pythonanywhere.com/'

const conf = axios.create({
    baseURL: 'http://dragonfly774.pythonanywhere.com/'
})
conf.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default {
    install(Vue) {
        Vue.prototype.$ajax = conf
    }
}