class Component {
    // Base component class
    constructor() {
        this.domElements = [];
    }

    createElement(tag, name, attr, text) {
        tag = typeof(tag) == 'string' && tag.length > 0 ? tag : 'div';
        attr = typeof(attr) == 'object' && Object.keys(attr).length > 0 ? attr : false;
        text = typeof(text) == 'string' && text.length > 0 ? text : false;
        name = typeof(name) == 'string' && name.length > 0 ? name : false;
        appendTo == typeof(appendTo) == 'object' && (appendTo instanceof Element || appendTo instanceof HTMLDocument) ? appendTo : false;
        let _appendable = true;
        
        if (name) {
            // Create DOM element
            let _element = document.createElement(tag);

            // Set Attributes to the element
            if (attr) {
                Object.keys(attr).map((key) => {
                    _element.setAttribute(key, attr[key]);
                });
            }

            // Set inner HTML text
            if (text) {
                _element.innerHTML = text;
            }

            // Register element 
            _appendable = this.registerElement(name, _element) == false ? false : true;

        } else {
            console.error("Every element should have a unique name.");
        }

        return this;
    }

    registerElement(name, element) {
        try {
            if (false != this.getElement(name)) {
                throw new Error("This element is already registered! The element '_name' value must have to be unique.");
            } else {
                this.domElements.push({
                    name: name,
                    element: element
                });
            }
        } catch (error) {
            console.error(error.message);
            return false;
        }
    }

    getElement(name) {
        let result = this.domElements.filter((element) => {
            return element.name == name;
        });

        if (result) {
            return result;
        }
        return false;
    }

    elementise() {

    }
}

export {Component};