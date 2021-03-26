// import $ from 'jquery';

import Presenter from './presenters/Presenter';
import Model from './models/Model';
import View from './views/View';

import { UserOptions } from './types';

export default (function ($) {
    let model: Model;
    let view: View;
    let presenter: Presenter;

    const methods: any = {
        init(options: UserOptions) {
            const init = (elem: JQuery) => {
                view = new View(elem);
                model = new Model(options);
                presenter = new Presenter(view, model);

                presenter.init();
            };

            this.each(function (this: JQuery) {
                init($(this));
            });
        },
        update(options: UserOptions) {
            console.log(options);
            model.updateOptions(options);
        },
    };

    $.fn.fsdSlider = function (method: any, ...options: any) {
        if (methods[method]) {
            return methods[method].apply(this, options);
        } if (typeof method === 'object' || !method) {
            return methods.init.apply(this, ...options);
        }
        $.error(`Метод с именем ${method} не существует для jQuery.fsdSlider`);

        return this;
    };
}(jQuery));
