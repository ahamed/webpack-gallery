
class Ingredient {
    /**
     * Ingredient constructor
     * 
     * @param tagname name of the tag i.e. div, button etc.
     * @param elementName unique element name. Every element must have one unique name
     * @param attrs element attributes i.e. class, id, type etc.
     * @param text element containing any innerHTML text
     */
    constructor(tagname, elementName, attrs, text) {
        this.tagname = typeof(tagname) == 'string' && tagname.length > 0 ? tagname : 'div';
        this.attrs = typeof(attrs) == 'object' && Object.keys(attrs).length > 0 ? attrs : false;
        this.text = typeof(text) == 'string' && text.length > 0 ? text : false;
        this.elementName = typeof(elementName) == 'string' && elementName.length > 0 ? elementName : false;
        
        this._isValid = true;
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
    
                // Register element
                this.registerElement(this.elementName, _element);

                // Return the element 
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
                // Push the element
                Depot.storageElements.push({
                    name: name,
                    element: element
                });
            } else {
                throw new Error('registerElement() says: Duplicated element name. Each element must have a unique name.');
            }
        } catch(ex) {
            console.error(ex.message);
            this._isValid = false;
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
        try{
            if (this._isValid) {
                return this._element;
            } else {
                throw new Error ("toDom() says: Invalid Element! Please check the element name. It must be unique.");
            }
        } catch (ex) {
            console.error(ex.message);
            return false;
        }
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
                throw new Error('append() says: Invalid element! The child element must have to be a DOM Element.');
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
                throw new Error('appendTo() says: Invalid element! The parent element where to append the element must have to be a DOM Element.');
            }
        } catch (ex) {
            console.error(ex.message);
        }
    }

    event(eventName, eventFunction, useCapture) {
        eventName = typeof(eventName) == 'string' && eventName.length > 0 ? eventName.toLowerCase() : false;
        eventFunction = typeof(eventFunction) == 'function' ? eventFunction : false;
        useCapture = typeof(useCapture) == 'boolean' ? useCapture : false;
        
        let validEvents = [
            'online', 'offline', // Ntwork events
            'focus', 'blur', // Focus events
            'reset', 'submit', // Form events
            'fullscreenchange', 'fullscreenerror', 'resize', 'scroll', // View events
            'cut', 'copy', 'paste', // Clipboard events
            'keypress', 'keyup', 'keydown', // Keyboard events
            'auxclick', 'click', 'contextmenu', 'dbclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel', // Mouse events
            'drag', 'drop', 'dragexit', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover' // Drag & Drop events

        ];


        try {
            if (!eventName) {
                throw new Error('event() says: event method must need a valid event name as first parameter.');
            }

            if (!eventFunction) {
                throw new Error('event() says: event method must need a function to perform.');
            }

            if (eventName && eventFunction) {
                if (validEvents.indexOf(eventName) > -1) {
                    this._element.addEventListener(eventName, eventFunction, useCapture);
                } else {
                    throw new Error('event() says: "' + eventName + '" is an unsupported event!');
                }
            }
        } catch(ex) {
            console.error(ex.message);
        }
        
    }
}

export { Ingredient };