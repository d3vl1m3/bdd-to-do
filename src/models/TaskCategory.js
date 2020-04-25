import {Model} from "@vuex-orm/core";

export default class TaskCategory extends Model {
    static entity = 'taskCategory';

    static primaryKey = ['task_id', 'category_id'];

    static fields() {
        return {
            id: this.uid(),
            task_id: this.attr(null),
            category_id: this.attr(null)
        }
    }
}