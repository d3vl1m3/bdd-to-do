import State from "@/models/State";
import TaskCategory from "@/models/TaskCategory";
import DoneStatesEnum from "@/enums/DoneStatesEnum";
import BootstrapModel from "@/models/BootstrapModel";

export default class Task extends BootstrapModel {
    // This is the name used as module name of the Vuex Store.
    static entity = 'tasks';

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            ...super.fields(),
            state_id: this.attr(null),
            title: this.attr(''),
            state: this.belongsTo(State, 'state_id'),
            done: this.attr(DoneStatesEnum.NOT_DONE),
            categories: this.hasMany(TaskCategory, 'task_id'),
        }
    }
}