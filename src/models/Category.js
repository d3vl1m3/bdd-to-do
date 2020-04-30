import TaskCategory from "@/models/TaskCategory";
import BootstrapModel from "@/models/BootstrapModel";

export default class Category extends BootstrapModel {
    // This is the name used as module name of the Vuex Store.
    static entity = 'categories';

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            ...super.fields(),
            title: this.attr(''),
            parent_id: this.attr(null),
            children: this.hasMany(Category, 'parent_id'),
            tasks: this.hasMany(TaskCategory, 'category_id'),
        }
    }
}