import $ from 'jquery';
import '../tmps/view/fsd-slider.scss';
import {Options} from '../types';
import Observable from '../observable/Observable';
import Scale from './Scale';
import Roller from './Roller';
import ProgressBar from './ProgressBar';

export default class View extends Observable {
    // value: null | {left: number, right: number};
    // step: null | number;
    $rootInput: JQuery;

    $rootElem: null | JQuery;

    sliderType: null | string;

    scale: Scale;

    rollers: { roller: Roller }[];

    progressBar: ProgressBar;

    constructor($rootInput: JQuery) {
        super();
        // this.value = null;
        // this.step = null;
        this.$rootInput = $rootInput;
        this.$rootElem = this.initRootElem();
        this.sliderType = null;
        this.handleChangeRootInput = this.handleChangeRootInput.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.scale = new Scale(this.$rootElem);
        this.progressBar = new ProgressBar(this.getScaleElem());
        this.rollers = []; // typeRoller
    }

    init(options: Options) { // заменить
        // this.setValue(options.value);
        console.log(options);
        this.setSliderType(options.mod);
        if(this.sliderType == 'range'){
            this.$rootInput.val(`${options.value?.left} -- ${options.value?.right}`);// заглушка //setRootInputValue()
        } else {
            this.$rootInput.val(`${options.value?.left}}`);// заглушка //etRootInputValue()
        }
        this.createRollers({step: options.step, value: options.value, minValue: options.minValue, maxValue: options.maxValue});
        this.initRollers();
        // this.progressBar.init(this.value);
        this.progressBar.setMinMax(options.minValue, options.maxValue);
        this.progressBar.setPosition(options.value);

        this.bindEventListeners();
    }

    updateValue(value: { left: number, right?: number }) {
        // this.setValue(value);
        if(this.sliderType == 'range'){
            this.$rootInput.val(`${value.left} -- ${value.right}`);
        } else {
            this.$rootInput.val(`${value.left}`);
        }
        // this.progressBar.init(value);
        this.progressBar.setPosition(value);
    }

    setSliderType(sliderType: string) {
        // sliderType ? this.sliderType = sliderType : this.sliderType = this.sliderType;
        this.sliderType = sliderType;
    }

    createRollers(options: {step: number, value: { left: number, right?: number }, minValue: number, maxValue: number}) { // аргументы сделать объектом
        const $scale = this.getScaleElem();
        if (this.sliderType === 'range' && options.value.right) {
            const leftRoller = new Roller($scale, 'left', options.value.left, options.step, options.minValue, options.maxValue, this.handleChangeValue);
            const rightRoller = new Roller($scale, 'right', options.value.right, options.step, options.minValue, options.maxValue, this.handleChangeValue);
            this.addRoller(leftRoller);
            this.addRoller(rightRoller);
        } else {
            const roller = new Roller($scale, 'left', options.value.left, options.step, options.minValue, options.maxValue, this.handleChangeValue);
            this.addRoller(roller);
        }                                                      // single mod
    }

    handleChangeValue() {
        this.broadcast('changeValue');
    }

    getValue() {
        const newValue: number[] = [];
        this.rollers.forEach((item: { roller: Roller }) => {
            newValue.push(item.roller.getValue());
        });
        return newValue;
    }

    getScaleElem() {
        return this.scale.getScale();
    }

    addRoller(roller: Roller) {
        this.rollers.push({ roller });
    }

    initRollers() {
        this.rollers.forEach((item) => {
            item.roller.init();
        });
    }

    bindEventListeners() {
        this.$rootInput.on('change', this.handleChangeRootInput);
    }

    handleChangeRootInput() {
        this.broadcast('changeInput');
    }

    consoleVal() {
        console.log(this.getValue());
    }

    initRootElem() {
        const $rootElem = this.createRootElem();
        this.renderRootElem($rootElem);
        return $rootElem;
        // this.setRootElem($rootElem);
    }

    createRootElem() {
        const $rootElem = $('<div class="fsd-slider"></div>');
        return $rootElem;
    }

    renderRootElem($rootElem: JQuery) {
        this.$rootInput.after($rootElem);
    }

    setRootElem($rootElem: JQuery) {
        this.$rootElem = $rootElem;
    }
}
