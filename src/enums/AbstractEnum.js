export default class AbstractEnum {
    static get properties() {
        console.warn(`${this.prototype.constructor.name} does not include a 'properties' getter`);
        return {}
    }

    // Uppercase getter name
    static getPropertyByKey(key) {
        return Object.prototype.hasOwnProperty.call(this, key)
            ? this.properties[key]
            : undefined;
    }

    // whatever the name is in the properties object
    static getPropertyByName(name) {
        const key = Object.keys(this.properties).find((k) => this.properties[k].name === name);
        return Object.prototype.hasOwnProperty.call(this.properties, key)
            ? this.properties[key]
            : undefined;
    }

    // whatever the value is in the properties object
    static getPropertyById(id) {
        const key = Object.keys(this.properties).find((k) => this.properties[k].id === id);
        return Object.prototype.hasOwnProperty.call(this.properties, key)
            ? this.properties[key]
            : undefined;
    }
}