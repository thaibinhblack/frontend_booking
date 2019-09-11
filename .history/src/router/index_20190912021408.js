import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const route = [
    {
        path: '/',
        component: () => import("@/page/Index.vue")
    }
]

export default new VueRouter({
    mode: 'history',
    routes: route
})