import BootstrapModel from "@/models/BootstrapModel";

export default class State extends BootstrapModel {
    // This is the name used as module name of the Vuex Store.
    static entity = 'states';

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            ...super.fields(),
            state: this.attr('')
        }
    }
}