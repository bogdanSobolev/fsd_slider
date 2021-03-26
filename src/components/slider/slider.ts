// import * as $ from 'jquery';
import $ from 'jquery';
import '../../plugins/fsd-slider/fsdSlider';
import './slider.scss';

const $sliderList = $('.js-slider');

$sliderList.each(function () {
    $(this).fsdSlider({ mod: 'range', value: { left: '32', right: 42 }, maxValue: 99 });
});

// console.log($sliderList);
// $sliderList.fsdSlider({ mod: 'range', value: { left: '32', right: 42 }, maxValue: 99 });

// $sliderList.fsdSlider('update', {
//     maxValue: 150,
//     value: {
//         left: 42,
//         right: '66',
//     },
//     step: 7
// })
