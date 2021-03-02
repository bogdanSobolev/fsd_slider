import * as $ from 'jquery';
// import Presenter from "./presenters/Presenter";
import Presenter from "./presenters/PresenterTs";
import Model from "./models/Model";
import View from "./views/View";



export default (function($) {
	// функция вызова jQuery-плагина
	// $.fn.fsdSlider = function() { // super test
	
	$.fn.fsdSlider = function(){
		
		// опции 
		// var config = $.extend({}, {
		// 	op1: '',
		// 	op2: ''
		// }, options);
		
		// function main(e: JQuery) {
			
		// 	const view = new View($(e));
		// 	const presenter = new Presenter(view);

		// 	presenter.init();
		// }
		// this.each(function() { main($(this)); });
		// return this;

		const init = (elem: JQuery) => {
			const view = new View(elem);
			// const view = new View($(this));
			const model = new Model();
			const presenter = new Presenter(view, model);


			presenter.init();
		}

		this.each(function() { 
			init($(this)); 
		});

		return this;

		// init();
		// return this;
	};
})(jQuery);