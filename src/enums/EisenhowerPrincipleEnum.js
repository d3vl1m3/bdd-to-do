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
            [this.URGENT]: {name: "urgent", value: this.URGENT},
            [this.IMPORTANT]: {name: "important", value: this.IMPORTANT},
        }
    }
}