class Component {
    // Base component class
    constructor() {
        this.domElements = [];
    }

    static registerElement(name, element) {
        if (this.getElement(name) == false) {
            return false;
        } else {
            this.constructor.domElements.push({
                name: name,
                element: element
            });
        }
        return true;
    }

    static getElement(name) {
        let result = this.constructor.domElements.filter((element) => {
            return element.name == name;
        });

        if (result) {
            return result;
        }
        return false;
    }
}

export {Component};