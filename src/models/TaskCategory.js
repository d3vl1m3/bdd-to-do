import {Model} from "@vuex-orm/core";
import Category from "@/models/Category";
import Task from "@/models/Task";

export default class TaskCategory extends Model {
    static entity = 'taskCategory';

    static primaryKey = ['task_id', 'category_id'];

    static fields() {
        return {
            id: this.uid(),
            task_id: this.attr(null),
            task: this.belongsTo(Task, 'task_id'),
            category_id: this.attr(null),
            category: this.belongsTo(Category, 'category_id'),
            order: this.attr(null)
        }
    }
}