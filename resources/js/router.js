import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

let authenticatedIs = (state) => (redirectRoute) => (toQuery) => async (to, _from, next) => {
  let isAuth = await store.getters['user/isAuthenticated']
  if (isAuth === state) {
    let toObj = { path: redirectRoute }
    if (toQuery) {
      toObj['query'] = { redirectFrom: to.fullPath }
    }
    next(toObj)
  } else {
    next()
  }
}
let notAuthRedirectToLogin = authenticatedIs(false)('/login')(true)
let authRedirectToHome = authenticatedIs(true)('/')(false)

export default new VueRouter({
  routes: [
    { path: '/', component: () => import('./components/Home') },
    { path: '/top', component: () => import('./components/TopMovies') },
    { path: '/register', component: () => import('./components/auth/Register'), beforeEnter: authRedirectToHome },
    { path: '/login', component: () => import('./components/auth/Login'), beforeEnter: authRedirectToHome },
    { path: '/friends', component: () => import('./components/Friends'), beforeEnter: notAuthRedirectToLogin },
    { path: '/user/:name', component: () => import('./components/user/name/Index') },
    { path: '/user/:name/list', component: () => import('./components/user/name/List') },
    { path: '*', component: () => import('./components/NotFoundComponent') }
  ],
  mode: 'history'
})
