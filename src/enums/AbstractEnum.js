export default class AbstractEnum {
    static get properties() {
        console.warn(`${this.prototype.constructor.name} does not include a 'properties' getter`);
        return {}
    }

    // Find by prop key
    static getPropertyByKey(key) {
        return Object.prototype.hasOwnProperty.call(this, key)
            ? this.properties[key]
            : undefined;
    }

    // Find by prop name
    static getPropertyByName(name) {
        const key = Object.keys(this.properties).find((k) => this.properties[k].name === name);
        return Object.prototype.hasOwnProperty.call(this.properties, key)
            ? this.properties[key]
            : undefined;
    }

    // Find by prop name
    static getPropertyById(id) {
        const key = Object.keys(this.properties).find((k) => this.properties[k].id === id);
        return Object.prototype.hasOwnProperty.call(this.properties, key)
            ? this.properties[key]
            : undefined;
    }
}