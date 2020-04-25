import AbstractEnum from "@/enums/AbstractEnum";

export default class EisenhowerPrincipleEnum extends AbstractEnum {
    static get EISENHOWER() {
        return 0;
    }

    static get properties() {
        return {
            [this.EISENHOWER]: {id: this.EISENHOWER, name: "urgent", data: EisenhowerPrincipleEnum},
        }
    }
}