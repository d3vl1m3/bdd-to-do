import Task from "@/models/Task";
import StatesEnum from "@/enums/StatesEnum";

import Vue from 'vue';

export default Vue.mixin({
    computed: {
        getActiveTasks() {
            return Task.query().where('state_id', StatesEnum.ACTIVE).get();
        },
        getAllActiveTasks() {
            return Task.query()
                .where('state_id', StatesEnum.ACTIVE)
                .withAllRecursive(2)
                .get();
        },
        getActiveTasksOnlyWithActiveCategories() {
            return Task.query()
                .where('state_id', StatesEnum.ACTIVE)
                .with('categories')
                .get();
        }
    }
});