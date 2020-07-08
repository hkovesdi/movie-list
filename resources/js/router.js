import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFoundComponent from './components/NotFoundComponent'
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '*', component: NotFoundComponent}
    ],
    mode: 'history'
});