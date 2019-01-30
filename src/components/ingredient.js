
class Ingredient {
    /**
     * 
     * @param tagname name of the tag i.e. div, button etc.
     * @param elementName unique element name. Every element must have one unique name
     * @param attrs element attributes i.e. class, id, type etc.
     * @param text element containing any innerHTML text
     */
    constructor(tagname, elementName, attrs, text) {
        // super();
        this.tagname = typeof(tagname) == 'string' && tagname.length > 0 ? tagname : 'div';
        this.attrs = typeof(attrs) == 'object' && Object.keys(attrs).length > 0 ? attrs : false;
        this.text = typeof(text) == 'string' && text.length > 0 ? text : false;
        this.elementName = typeof(elementName) == 'string' && elementName.length > 0 ? elementName : false;
        this._element = this.create();
        
    }



    /**
     * Create a DOM Element
     */
    create() {
        try {
            if (this.elementName) {
                // Create DOM element
                let _element = document.createElement(this.tagname);
                
                // Set Attributes to the element
                if (this.attrs) {
                    Object.keys(this.attrs).map((key) => {
                        _element.setAttribute(key, this.attrs[key]);
                    });
                }
    
                // Set inner HTML text
                if (this.text) {
                    _element.innerHTML = this.text;
                }
    
                //TODO Register element
                this.registerElement(this.elementName, _element);
                return _element;
            } else {
                throw new Error("Every element must have a unique name.");
            }

        } catch(ex) {
            console.error(ex.message);
        }
    }

    registerElement(name, element) {
        try {
            if (this.getElement(name) == false) {
                Depot.storageElements.push({
                    name: name,
                    element: element
                });
            } else {
                throw new Error('Duplicated element name. Each element must have a unique name.');
            }
        } catch(ex) {
            console.error(ex.message);
        }
    }

    getElement(name) {
        let el = Depot.storageElements.filter((element) => element.name == name);
        return el ? el : false;
    }

    /**
     * elementise the class
     */
    toDom() {
        return this._element;
    }



    /**
     * Append a child within the element
     * @param child DOM Element, which is supposed to append.
     * @return element
     */
    append(child) {
        child = typeof(child) == 'object' && child instanceof Element ?  child : false;
        try {
            if (child) {
                this._element.appendChild(child);
            } else {
                throw new Error('Invalid element! The child element must have to be a DOM Element.');
            }
        } catch (ex) {
            console.error(ex.message);
        }
    }



    /**
     * Append the element in a given parent element
     * @param parent DOM Element where the element is supposed to append.
     * @return parent element 
     */
    appendTo(parent) {
        parent = typeof(parent) == 'object' && parent instanceof Element ?  parent : false;
        try {
            if (parent) {
                parent.appendChild(this._element);
            } else {
                throw new Error('Invalid element! The parent element where to append the element must have to be a DOM Element.');
            }
        } catch (ex) {
            console.error(ex.message);
        }
    }

    event(eventName, eventFunction, useCapture) {
        eventName = typeof(eventName) == 'string' && eventName.length > 0 ? eventName.toLowerCase() : false;
        eventFunction = typeof(eventFunction) == 'function' ? eventFunction : false;
        useCapture = typeof(useCapture) == 'boolean' ? useCapture : false;
        let validEvents = ['click', 'keyup', 'keydown'];

        try {
            if (!eventName) {
                throw new Error('event method must need a valid event name as first parameter.');
            }

            if (!eventFunction) {
                throw new Error('event method must need a function to perform.');
            }

            if (eventName && eventFunction) {
                if (validEvents.indexOf(eventName) > -1) {
                    this._element.addEventListener(eventName, eventFunction, useCapture);
                }
            }
        } catch(ex) {
            console.error(ex.message);
        }
        
    }
}

export { Ingredient };