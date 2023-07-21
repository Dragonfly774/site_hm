import VueRouter from "vue-router"
import PageWithModels from "@/pages/PageWithModels.vue";
import LoginPage from "@/pages/LoginPage.vue";
import Vue from "vue";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: PageWithModels,
        meta: {requestAuth: true}
    },
    {
        path: "/login",
        component: LoginPage,
        meta: {requestAuth: false}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requestAuth && !token){
        next('/login')
    } else {
        next()
    }
})
export default router;