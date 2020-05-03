import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Home page',
                'main-header': 'What needs doing?'
            }
        },
        {
            path: '/sorting',
            name: 'task_sorting',
            component: () => import(/* webpackChunkName: "sorting" */ '@/views/sorting/index.vue'),
            meta: {
                title: 'Sort tasks',
                'main-header': 'How important/urgent are these?'
            }
        },
        {
            path: '/deleted',
            name: 'deleted_tasks',
            component: () => import(/* webpackChunkName: "sorting" */ '@/views/deleted/index.vue'),
            meta: {
                title: 'Trash',
                'main-header': 'Deleted tasks'
            }
        }
    ]
})