import $ from 'jquery';
import progressBarTmp from '../tmps/progress-bar/fsd-slider__progress-bar.html';
import '../tmps/progress-bar/fsd-slider__progress-bar.scss';

export default class ProgressBar {
    // $rootElem: JQuery;
    $scale: JQuery;

    $progressBar: JQuery;

    // value: null | {left: number, right: number};
    sliderMinValue: number;

    sliderMaxValue: number;

    constructor($scale: JQuery) {
        // this.value = null;
        this.$scale = $scale;
        this.sliderMinValue = 0; // model
        this.sliderMaxValue = 100; // model
        this.$progressBar = this.initProgressBar();
    }

    setMinMax(minValue: number, maxValue: number) {
        this.sliderMinValue = minValue;
        this.sliderMaxValue = maxValue;
    }

    setPosition(value: null | { left: number, right: number }) {
        if (value) {
            const percentLeft = this.countPersent(value.left);
            const percentRight = this.countPersent(value.right);
            this.$progressBar.css('left', `${percentLeft}%`);
            this.$progressBar.css('right', `${100 - percentRight}%`);
        }
    }

    // udpdateValue(value: {left: number, right: number}){

    // }

    countPersent(value: number) {
        return ((value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
    }

    // setValue(value: null | {left: number, right: number}){
    //     this.value = value;
    // }

    initProgressBar() {
        const $progressBar: JQuery = this.createProgressBar();
        this.renderProgressBar($progressBar);
        return $progressBar;
    }

    createProgressBar() {
        const $progressBar = $(progressBarTmp);
        return $progressBar;
    }

    renderProgressBar($progressBar: JQuery) {
        this.$scale.append($progressBar);
    }
}
