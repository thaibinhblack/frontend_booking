import Vue from 'vue'
import Vuex from 'vuex'
import BookingModule from './modules/booking'
Vue.use(Vuex)

const state = {
    API_URL: 'http://api.duyanhplus.com/api_booking/public/api/v1/',
    PUBLIC_URL: 'http://api.duyanhplus.com/api_booking/public/',
    step: 1,
    date: new Date()
}

export default new Vuex.Store({
    state,
    modules: {
        BookingModule
    }
})