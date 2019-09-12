import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    API_URL: 'http://api.duyanhplus.com/server/public/api/v1/',
    PUBLIC_URL: 'http://api.duyanhplus.com/server/public/',
    step: 1
}

export default new Vuex.Store({
    state
})