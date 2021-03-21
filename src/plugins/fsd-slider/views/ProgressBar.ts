import $ from 'jquery';

import progressBarTmp from '../tmps/progress-bar/fsd-slider__progress-bar.html';
import '../tmps/progress-bar/fsd-slider__progress-bar.scss';

export default class ProgressBar {
    $scale: JQuery;

    $progressBar: JQuery;

    sliderMinValue: number;

    sliderMaxValue: number;

    constructor($scale: JQuery) {
        this.$scale = $scale;
        this.sliderMinValue = 0; // model
        this.sliderMaxValue = 100; // model
        this.$progressBar = this.initProgressBar();
    }

    setMinMax(minValue: number, maxValue: number) {
        this.sliderMinValue = minValue;
        this.sliderMaxValue = maxValue;
    }

    setPosition(value: { left: number, right?: number }) {
        let percentLeft: number;
        let percentRight: number;
        if (value.right) {
            percentLeft = this.countPersent(value.left);
            percentRight = this.countPersent(value.right);
        } else {
            percentLeft = 0;
            percentRight = this.countPersent(value.left);
        }
        this.$progressBar.css('left', `${percentLeft}%`);
        this.$progressBar.css('right', `${100 - percentRight}%`);
    }

    countPersent(value: number) {
        let percent = ((value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        return Number(percent.toFixed(4));
    }

    initProgressBar() {
        const $progressBar: JQuery = this.createProgressBar();
        this.renderProgressBar($progressBar);
        return $progressBar;
    }

    createProgressBar() {
        const $progressBar:JQuery = $(progressBarTmp);
        return $progressBar;
    }

    renderProgressBar($progressBar: JQuery) {
        this.$scale.append($progressBar);
    }
}
