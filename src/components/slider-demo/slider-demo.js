import $ from 'jquery';

const $sliderDemoList = $('.js-slider-demo');

// $sliderDemoList.each(function () {
//     const $slider = $(this).find('.js-slider-demo__slider').children();
//     const $optionsForm = $(this).find('.js-slider-demo__options-form');
//     $optionsForm.on('submit', (e) => {
//         e.preventDefault();
//         const formDataArr = $optionsForm.serializeArray();
//         const options = {};
//         $.each(formDataArr, function () {
//             options[this.name] = this.value;
//         });
//         $slider.fsdSlider('update', options);
//     });
// });

$sliderDemoList.each(function () {
    const $slider = $(this).find('.js-slider-demo__slider').children();
    const $optionsForm = $(this).find('.js-slider-demo__options-form');
    function handleOptionsFormSubmit(e) {
        e.preventDefault();
        const formDataArr = $optionsForm.serializeArray();
        const options = {};
        $.each(formDataArr, function () {
            options[this.name] = this.value;
        });
        $slider.fsdSlider('update', options);
    }
    $optionsForm.on('submit', handleOptionsFormSubmit);
});
