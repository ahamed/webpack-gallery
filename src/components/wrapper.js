import { Ingredient } from "./ingredient";

class Wrapper {
    constructor(baseElement) {
        this.baseElement = baseElement;
        this.createWrapper();
    }

    createWrapper() {
        // spgalleryDropArea @parent baseElement
        let galleryDropArea = new Ingredient('div', 'spgalleryDropArea',{
            class: 'spgallery-drop-area'
        });
        galleryDropArea.appendTo(this.baseElement);


        // basicButtonGroup @parent galleryDropArea
        let basicButtonGroup = new Ingredient('div', 'basicButtonGroup', {
            class: 'buttons basic-button-group'
        });
        galleryDropArea.append(basicButtonGroup.toDom());

        // uploadImages button @parent spgalleryDropArea
        let uploadImages = new Ingredient('button', 'uploadImages', {
            class: 'button is-success is-outlined fa fa-upload',
            type: 'button'
        }, ' Upload');
        basicButtonGroup.append(uploadImages.toDom());

        // mediaLibrary button @parent spgalleryDropArea
        let mediaLibrary = new Ingredient('button', 'mediaLibrary', {
            class: 'button is-danger is-outlined fa fa-picture-o',
            type: 'button'
        }, ' Media Library');
        basicButtonGroup.append(mediaLibrary.toDom());

    }
}

export {Wrapper};