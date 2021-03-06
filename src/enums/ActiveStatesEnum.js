// Used for tracking the current published state of an item
import AbstractEnum from "@/enums/AbstractEnum";

export default class ActiveStatesEnum extends AbstractEnum {
    static get ACTIVE() {
        return 0;
    }

    static get INACTIVE() {
        return 1;
    }

    static get ARCHIVED() {
        return 2;
    }

    static get DELETED() {
        return 3;
    }

    static get properties() {
        return {
            [this.ACTIVE]: {name: "active", value: this.ACTIVE},
            [this.INACTIVE]: {name: "inactive", value: this.INACTIVE},
            [this.ARCHIVED]: {name: "archived", value: this.ARCHIVED},
            [this.DELETED]: {name: "deleted", value: this.DELETED},
        }
    }
}