import {Model} from '@vuex-orm/core'
import State from "@/models/State";
import TaskCategory from "@/models/TaskCategory";
import DoneStatesEnum from "@/enums/DoneStatesEnum";

export default class Task extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'tasks';

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.uid(),
            state_id: this.attr(null),
            title: this.attr(''),
            state: this.belongsTo(State, 'state_id'),
            done: this.attr(DoneStatesEnum.NOT_DONE),
            categories: this.hasMany(TaskCategory, 'task_id'),
        }
    }
}