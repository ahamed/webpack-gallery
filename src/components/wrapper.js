import { Ingredient } from "./ingredient";

class Wrapper {
    constructor() {
        this.createWrapper();
    }

    createWrapper() {
        let el = new Ingredient('div', 'div1', {class: 'cls1'});
        let el2 = new Ingredient('button', 'button1', {class: 'button is-primary'}, 'Button');
        el.append(el2.toDom());
        el.appendTo(document.body);

        el2.event('click', (event) => {
            alert('clicked');
        });
        
        console.log(Depot.storageElements);
    }
}

export {Wrapper};