// import * as $ from 'jquery';
import $ from 'jquery';
import '../../plugins/fsd-slider/fsdSlider';
import './slider.scss';

const $sliderList = $('.slider');

$sliderList.each(function () {
    $(this).fsdSlider();
});
