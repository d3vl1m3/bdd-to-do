// Used for tracking the current completion state of an item
import AbstractEnum from "@/enums/AbstractEnum";

export default class DoneStatesEnum extends AbstractEnum {
    static get NOT_DONE() {
        return 0;
    }

    static get DONE() {
        return 1;
    }

    static get properties() {
        return {
            [this.NOT_DONE]: {name: "not-done", value: this.NOT_DONE},
            [this.DONE]: {name: "done", value: this.DONE}
        }
    }
}