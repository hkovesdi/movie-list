import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundComponent from './components/NotFoundComponent'
import Home from './components/Home'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '*', component: NotFoundComponent }
  ],
  mode: 'history'
})
