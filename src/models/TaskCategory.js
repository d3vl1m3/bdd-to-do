import Category from "@/models/Category";
import Task from "@/models/Task";
import BootstrapModel from "@/models/BootstrapModel";

export default class TaskCategory extends BootstrapModel {
    static entity = 'taskCategory';

    static primaryKey = ['task_id', 'category_id'];

    static fields() {
        return {
            ...super.fields(),
            task_id: this.attr(null),
            task: this.belongsTo(Task, 'task_id'),
            category_id: this.attr(null),
            category: this.belongsTo(Category, 'category_id'),
            order: this.attr(null)
        }
    }
}