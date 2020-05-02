import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import router from '@/router'
import App from './App.vue'
import State from '@/models/State'
import Task from '@/models/Task'
import Category from '@/models/Category'
import TaskCategory from '@/models/TaskCategory'
import DbSeeder from '@/DbSeeder'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimes, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.use(Vuex);

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(State);
database.register(Task);
database.register(Category);
database.register(TaskCategory);

const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
});

DbSeeder.init();

library.add(faTimes);
library.add(faCheck);
library.add(faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
