import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import navigation from './modules/navigation'
import user from './modules/user'
import movies from './modules/movies'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    window,
    navigation,
    user,
    movies
  }
})
