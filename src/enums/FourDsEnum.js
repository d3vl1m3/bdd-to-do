import AbstractEnum from "@/enums/AbstractEnum";

export default class FourDsEnum extends AbstractEnum {
    static get DELETE() {
        return 0;
    }

    static get DELEGATE() {
        return 1;
    }

    static get DEFER() {
        return 2;
    }

    static get DO() {
        return 3;
    }

    static get properties() {
        return {
            [this.DELETE]: {name: "delete", value: this.DELETE},
            [this.DELEGATE]: {name: "delegate", value: this.DELEGATE},
            [this.DEFER]: {name: "defer", value: this.DEFER},
            [this.DO]: {name: "do", value: this.DO},
        }
    }
}