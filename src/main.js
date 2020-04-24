import Vue from 'vue'
import Vuex from "vuex";
import VuexORM from '@vuex-orm/core'
import App from './App.vue'
import State from '@/models/State'
import Task from '@/models/Task'
import Tag from '@/models/Tag'
import TaskTag from '@/models/TaskTag'
import DbSeeder from '@/DbSeeder'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.use(Vuex);

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(State);
database.register(Task);
database.register(Tag);
database.register(TaskTag);

const store = new Vuex.Store({
    plugins: [VuexORM.install(database)]
});

DbSeeder.init();

library.add(faTimesCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
