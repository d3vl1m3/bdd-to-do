import {Model} from "@vuex-orm/core";

export default class TaskTag extends Model {
    static entity = 'taskTag';

    static primaryKey = ['task_id', 'tag_id'];

    static fields() {
        return {
            id: this.attr(null),
            task_id: this.attr(null),
            tag_id: this.attr(null),
            order: this.number(1)
        }
    }
}