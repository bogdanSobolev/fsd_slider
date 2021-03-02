import * as $ from 'jquery';
// import $ from 'jquery';
import Presenter from "./presenters/Presenter";
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

		const init = (elem: any) => {
			
			// const elem = $(this): jQuery;
			const view = new View(elem);
			// const view = new View($(this));
			const presenter = new Presenter(view);

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