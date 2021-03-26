import $ from 'jquery';

import rollerTmp from '../tmps/roller/fsd-slider__roller.html';
import '../tmps/roller/fsd-slider__roller.scss';

export default class Roller {
    $scale: JQuery;

    $rollerElem: JQuery;

    $rollerInput: JQuery;

    $rollerBtn: JQuery;

    typeRoller: string;

    sliderMinValue: number; // model

    sliderMaxValue: number; // model

    value: number; // model

    step: number;

    handleChangeValue?: any; // Изменить на обязательное свойство

    constructor(options: {
        $scale: JQuery,
        typeRoller: string,
        value: number,
        step: number,
        minValue: number,
        maxValue: number,
        handleChangeValue?: any,
    }) {
        this.$scale = options.$scale;
        this.typeRoller = options.typeRoller;
        this.sliderMinValue = options.minValue;
        this.sliderMaxValue = options.maxValue;
        this.value = options.value;
        this.step = options.step;
        this.$rollerElem = this.initRollerElem();
        this.$rollerInput = this.initRollerInput();
        this.$rollerBtn = this.setRollerBtn();

        this.handleChangeValue = options.handleChangeValue || null;
    }

    init() {
        this.updatePositionRollerBtn();
        this.bindEventListeners();
    }

    bindEventListeners() {
        this.$rollerInput.on('input', this.handleInputInput.bind(this));
    }

    handleInputInput = () => {
        const inputValue = Number(this.$rollerInput.val());
        this.setValue(inputValue);
        this.handleChangeValue();
    };

    initRollerElem() {
        const $rollerElem: JQuery = this.createRollerElem();
        this.renderRollerElem($rollerElem);
        return $rollerElem;
    }

    createRollerElem() {
        const $rollerElem:JQuery = $(rollerTmp);
        $rollerElem.addClass(`fsd-slider__roller_type_${this.typeRoller}`);
        return $rollerElem;
    }

    renderRollerElem($rollerElem: JQuery) {
        this.$scale.append($rollerElem);
    }

    setValue(value: number) {
        this.value = value;
    }

    initRollerInput() {
        const $rollerInput: JQuery = this.setRollerInput();
        this.setOptionsRollerInput();
        this.setValueRollerInput();
        return $rollerInput;
    }

    setOptionsRollerInput() {
        this.$rollerInput.attr('step', this.step);
        this.$rollerInput.attr('min', this.sliderMinValue);
        this.$rollerInput.attr('max', this.sliderMaxValue);
    }

    setStep(value: number) {
        this.step = value;
    }

    updateOptions(options: {
        step: number,
        minValue: number,
        maxValue: number,
        value: number
    }) {
        const {
            step, value, minValue, maxValue,
        } = options;
        this.setStep(step);
        this.updateMinMaxValues({ minValue, maxValue });

        this.setOptionsRollerInput();
        this.updateValue(value);

        const isInputValueAdjustedToStep = this.value !== Number(this.$rollerInput.val());
        if (isInputValueAdjustedToStep) {
            setTimeout(this.handleInputInput, 0);
        }
    }

    updateMinMaxValues(options: {
        minValue: number,
        maxValue: number,
    }) {
        const {
            minValue, maxValue,
        } = options;
        this.setSliderMinValue(minValue);
        this.setSliderMaxValue(maxValue);
    }

    setSliderMinValue(value: number) {
        this.sliderMinValue = value;
    }

    setSliderMaxValue(value: number) {
        this.sliderMaxValue = value;
    }

    setValueRollerInput() {
        this.$rollerInput.val(this.value);
    }

    setRollerInput() {
        const $rollerInput: JQuery = this.$rollerInput = this.$rollerElem.find('.fsd-slider__roller-input');
        return $rollerInput;
    }

    updateValue(value?: number) {
        if (value) {
            this.setValue(value);
            this.setValueRollerInput();
            this.updatePositionRollerBtn();
        }
    }

    setRollerBtn() {
        const $rollerBtn: JQuery = this.$rollerBtn = this.$rollerElem.find('.fsd-slider__roller-btn');
        return $rollerBtn;
    }

    getValue() {
        return this.value;
    }

    updatePositionRollerBtn() {
        const percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        if (this.typeRoller === 'right') {
            this.$rollerBtn?.css('right', `${100 - percent}%`);
        } else {
            this.$rollerBtn?.css('left', `${percent}%`);
        }
    }
}
