import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/sorting',
            name: 'task_sorting',
            component: () => import(/* webpackChunkName: "sorting" */ '@/views/sorting/index.vue')
        }
    ]
})