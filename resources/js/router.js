import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

// Set up some useful guards
const authenticatedIs = (state, redirectRoute, toQuery) => (to, _from, next) => {
  if (store.getters['user/isAuthenticated'] === state) {
    let toObj = { path: redirectRoute }
    if (toQuery) {
      toObj['query'] = { redirectFrom: to.fullPath }
    }
    next(toObj)
  } else {
    next()
  }
}
const notAuthRedirectToLogin = authenticatedIs(false, '/login', true)

export default new VueRouter({
  routes: [
    { path: '/user/:name/list', component: () => import('./components/user/name/List') },
    { path: '/user/:name', component: () => import('./components/user/name/Index') },
    { path: '/top', component: () => import('./components/TopMovies') },
    { path: '/friends', component: () => import('./components/Friends'), beforeEnter: notAuthRedirectToLogin },
    {
      path: '/signout',
      beforeEnter: async (_to, _from, next) => {
        await store.dispatch('user/logout')
        next('/')
      }
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('./components/movies/Movie'),
      props: true
    },
    { path: '/', component: () => import('./components/Home') },
    { path: '*', component: () => import('./components/NotFoundComponent') }
  ],
  mode: 'history'
})
