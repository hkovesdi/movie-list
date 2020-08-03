import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import navigation from './modules/navigation'
import user from './modules/user'
import movies from './modules/movies'
import modals from './modules/modals'
import snackbar from './modules/snackbar'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    window,
    navigation,
    user,
    movies,
    modals,
    snackbar,
    search
  }
})
