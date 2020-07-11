import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundComponent from './components/NotFoundComponent'
import Home from './components/Home'
import Friends from './components/Friends'
import TopMovies from './components/TopMovies'
import UserName from './components/user/name/Index'
import UserNameList from './components/user/name/List'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/top', component: TopMovies },
    { path: '/friends', component: Friends },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user/:name', component: UserName },
    { path: '/user/:name/list', component: UserNameList },
    { path: '*', component: NotFoundComponent }
  ],
  mode: 'history'
})
