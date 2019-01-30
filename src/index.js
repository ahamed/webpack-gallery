import _ from 'lodash';
import '../assets/css/style.css';
import '../assets/sass/imports.sass';
import 'font-awesome/css/font-awesome.min.css';
import { Wrapper } from './components/wrapper';


class gallery {
    constructor(options) {
        this._defaults = {
        };
        this.options = _.extend({}, this._defaults, options);
        new Wrapper(this.options.baseElement);
    }
}

export {gallery};