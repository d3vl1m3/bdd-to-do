import {Model} from '@vuex-orm/core'

export default class BootstrapModel extends Model {
    static fields() {
        return {
            id: this.uid(),
            created_at: this.attr(''),
            updated_at: this.attr('')
        }
    }
}