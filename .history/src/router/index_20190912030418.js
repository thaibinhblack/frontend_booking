import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import("@/page/Index.vue")
    },
    {
        path: '/booking',
        component: () => import('@/page/FormBooking.vue')
    }
]

export default new VueRouter({
    mode: 'history',
    routes: routes
})