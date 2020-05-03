import Task from "@/models/Task";
import ActiveStatesEnum from "@/enums/ActiveStatesEnum";

import Vue from 'vue';
import DoneStatesEnum from "@/enums/DoneStatesEnum";

export default Vue.mixin({
    computed: {
        getActiveTasks() {
            return Task.query().where('state_id', ActiveStatesEnum.ACTIVE).get();
        },
        getAllIncompleteActiveTasks() {
            return Task.query()
                .where('state_id', ActiveStatesEnum.ACTIVE)
                .where('done', DoneStatesEnum.NOT_DONE)
                .withAllRecursive(2)
                .get();
        },
        getAllCompleteActiveTasks() {
            return Task.query()
                .where('state_id', ActiveStatesEnum.ACTIVE)
                .where('done', DoneStatesEnum.DONE)
                .withAllRecursive(2)
                .get();
        },
        getActiveTasksOnlyWithActiveCategories() {
            return Task.query()
                .where('state_id', ActiveStatesEnum.ACTIVE)
                .with('categories')
                .get();
        },
        getAllArchivedTasks() {
            return Task.query()
                .where('state_id', ActiveStatesEnum.DELETED)
                .get();
        }
    }
});