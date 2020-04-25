import {Model} from "@vuex-orm/core";

export default class TaskCategory extends Model {
    static entity = 'taskCategory';

    static primaryKey = ['task_id', 'category_id'];

    static fields() {
        return {
            id: this.attr(null),
            task_id: this.attr(null),
            category_id: this.attr(null),
            order: this.number(1)
        }
    }
}