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
            {path: 'bookings', component: () => import('@/page/manager/booking/bookings.vue')},
            {path: 'booking/:uuid', component: () => import('@/page/manager/booking/detailBooking.vue')},
            {path:  'users', component: () => import('@/page/manager/user/users.vue')},
            {path: 'add-user', component: () => import('@/page/manager/user/addUser.vue')},
            {path: 'user/:uuid', component: () => import('@/page/manager/user/detailUser.vue')},
            {path: 'stores', component: () => import('@/page/manager/store/stores.vue')},
            {path: 'store/:uuid', component: () => import('@/page/manager/store/detailStore.vue')},
            {path: 'add-store',  component: () => import('@/page/manager/store/addStore.vue')},
            {path: 'services', component: () => import('@/page/manager/service/services.vue') },
            {path: 'codes', component: () => import('@/page/manager/store/codes.vue') },
            {path: 'stylists', component: () => import('@/page/manager/stylist/stylists.vue')},
            {path: 'historys', component: () => import('@/page/manager/history/historys.vue') },
            {path: 'questions', component: () => import('@/page/manager/question/questions.vue') }
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