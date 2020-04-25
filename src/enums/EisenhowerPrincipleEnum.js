import AbstractEnum from "@/enums/AbstractEnum";

export default class EisenhowerPrincipleEnum extends AbstractEnum {
    static get URGENT() {
        return 0;
    }

    static get IMPORTANT() {
        return 1;
    }

    static get properties() {
        return {
            [this.URGENT]: {id: this.URGENT, name: "urgent"},
            [this.IMPORTANT]: {id: this.IMPORTANT, name: "important"},
        }
    }
}