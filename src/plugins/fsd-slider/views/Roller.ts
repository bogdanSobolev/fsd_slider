import $ from 'jquery';

import rollerTmp from '../tmps/roller/fsd-slider__roller.html';
import '../tmps/roller/fsd-slider__roller.scss';

export default class Roller {
    $scale: JQuery;

    $rollerElem: null | JQuery;

    $rollerInput: null | JQuery;

    $rollerBtn: null | JQuery;

    typeRoller: null | string;

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
        this.$rollerElem = null;
        this.$rollerInput = null;
        this.$rollerBtn = null;
        this.typeRoller = options.typeRoller || null;
        this.sliderMinValue = options.minValue;
        this.sliderMaxValue = options.maxValue;
        this.value = options.value;
        this.step = options.step;
        this.handleChangeValue = options.handleChangeValue || null;
    }

    init() {
        const $rollerElem = this.createRollerElem();
        this.renderRollerElem($rollerElem);
        this.setRollerElem($rollerElem);
        this.setRollerInput();
        this.setOptionsRollerInput();
        this.setValueRollerInput();
        this.setRollerBtn();
        this.updatePositionRollerBtn();

        this.bindEventListeners();
    }

    bindEventListeners() {
        this.$rollerInput?.on('input', this.inputHandlers.bind(this));
    }

    inputHandlers() {
        this.updatePositionRollerBtn();
        this.handleChangeValue();
    }

    createRollerElem() {
        const $rollerElem = $(rollerTmp);
        if (this.typeRoller) {
            $rollerElem.addClass(`fsd-slider__roller_type_${this.typeRoller}`);
        }
        return $rollerElem;
    }

    renderRollerElem($rollerElem: JQuery) {
        this.$scale?.append($rollerElem);
    }

    setRollerElem($rollerElem: JQuery) {
        this.$rollerElem = $rollerElem;
    }

    setValue(value: number) {
        this.value = value;
    }

    setOptionsRollerInput() {
        this.$rollerInput?.attr('step', this.step);
        this.$rollerInput?.attr('min', this.sliderMinValue);
        this.$rollerInput?.attr('max', this.sliderMaxValue);
    }

    setValueRollerInput() {
        this.$rollerInput?.val(this.value);
    }

    updateValue(value?: number) {
        if (value) {
            this.setValue(value);
            this.setValueRollerInput();
        } else {
            const inputValueStr: any = this.$rollerInput?.val() ? this.$rollerInput?.val() : null;

            if (inputValueStr) {
                const inputValueInt: number = Number(inputValueStr);
                this.setValue(inputValueInt);
            }
        }
    }

    setRollerInput() {
        if (this.$rollerElem) {
            this.$rollerInput = this.$rollerElem.find('.fsd-slider__roller-input');
        }
    }

    setRollerBtn() {
        if (this.$rollerElem) {
            this.$rollerBtn = this.$rollerElem.find('.fsd-slider__roller-btn');
        }
    }

    // setValue() {
    //     // var _this = inputLeft,                                                          //
    //     //     min = parseInt(_this.min),                                                  //
    //     //     max = parseInt(_this.max);                                                  //
    //     // _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);  //позже

    //     let percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;

    //     thumbLeft.style.left = percent + "%";
    //     // range.style.left = percent + "%";  //позже
    // }

    getValue() {
        return this.value;
    }

    updatePositionRollerBtn() {
        this.updateValue();
        const percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        if (this.typeRoller === 'right') {
            this.$rollerBtn?.css('right', `${100 - percent}%`);
        } else {
            this.$rollerBtn?.css('left', `${percent}%`);
        }
    }
}
