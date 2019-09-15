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
        component: () => import('@/page/FormBooking.vue'),
    },
    {
        path: '/done/:phone',
        component: () => import('@/page/BookingDone.vue'),
    },
    {
        path: '/manager',
        component: () => import('@/page/manager/ManagerBooking.vue'),
        children: [
            {path: '', component: () => import('@/page/manager/booking/bookings.vue')}
        ]
    },
    {
        path: '/login',
        component: () => import('@/page/Login.vue')
    }
    
]

export default new VueRouter({
    mode: 'history',
    routes: routes
})