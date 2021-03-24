import Presenter from './presenters/Presenter';
import Model from './models/Model';
import View from './views/View';

import { UserOptions } from './types';

export default (function ($) {
    let model: Model;
    let view: View;
    let presenter: Presenter;

    const methods: any = {
        init : function( options: UserOptions ) { 
            const init = (elem: JQuery) => {
                view = new View(elem);
                model = new Model(options);
                presenter = new Presenter(view, model);
    
                presenter.init();
            };
    
            this.each(function () {
                init($(this));
            });
        },
        update : function( options: UserOptions ) {
        //   console.log(model);
            model.updateOptions(options);
        }
    };

    
    

    $.fn.fsdSlider = function (method: any) {
        if (methods[method]) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.fsdSlider' );
        } 

        return this;
    };


    // $.fn.fsdSlider = function (options: UserOptions) {
    //     const init = (elem: JQuery) => {
    //         const view = new View(elem);
    //         const model = new Model(options);
    //         const presenter = new Presenter(view, model);

    //         presenter.init();
    //     };

    //     this.each(function () {
    //         init($(this));
    //     });

    //     function cons(){
    //         console.log('slider');
    //     }

    //     return this;
    // };
}(jQuery));
