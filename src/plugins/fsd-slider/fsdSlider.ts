import Presenter from './presenters/Presenter';
import Model from './models/Model';
import View from './views/View';

import { UserOptions } from './types';

export default (function ($) {
    $.fn.fsdSlider = function (options: UserOptions) {
        const init = (elem: JQuery) => {
            const view = new View(elem);
            // const view = new View($(this));
            const model = new Model(options);
            const presenter = new Presenter(view, model);

            presenter.init();
        };

        this.each(function () {
            init($(this));
        });

        return this;
    };
}(jQuery));
