import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import("@/page/Index.vue")
    },
    {
        path: '/booking/:phone',
        component: () => import('@/page/FormBooking.vue')
    },
    {
        path: '/manager',
        component: () => import('@/page/manager/ManagerBooking.vue')
    }
]

export default new VueRouter({
    mode: 'history',
    routes: routes
})