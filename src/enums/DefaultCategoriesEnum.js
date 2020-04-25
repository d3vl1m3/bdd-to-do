import AbstractEnum from "@/enums/AbstractEnum";
import EisenhowerPrincipleEnum from "@/enums/EisenhowerPrincipleEnum";

export default class DefaultCategoriesEnum extends AbstractEnum {
    static get EISENHOWER() {
        return 0;
    }

    static get properties() {
        return {
            [this.EISENHOWER]: {id: this.EISENHOWER, name: "eisenhower-principle", data: EisenhowerPrincipleEnum},
        }
    }
}