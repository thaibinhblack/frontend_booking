import Vue from 'vue'
import Vuex from 'vuex'
import BookingModule from './modules/booking'
Vue.use(Vuex)

const state = {
    API_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000/api/v1/',
    step: 1,
    date: new Date()
}

export default new Vuex.Store({
    state,
    modules: {
        BookingModule
    }
})