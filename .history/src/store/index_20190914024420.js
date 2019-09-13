import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    API_URL: 'http://api.duyanhplus.com/api_booking/public/api/v1/',
    PUBLIC_URL: 'http://api.duyanhplus.com/api_booking/public/',
    step: 1
}

export default new Vuex.Store({
    state
})