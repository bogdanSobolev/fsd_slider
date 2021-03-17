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
        let {mod, value, step, minValue, maxValue} = options;
        this.setSliderType(mod);
        if(this.sliderType == 'range'){
            this.$rootInput.val(`${value?.left} -- ${value?.right}`);// заглушка //setRootInputValue()
        } else {
            this.$rootInput.val(`${value?.left}}`);// заглушка //etRootInputValue()
        }
        this.createRollers({step: step, value: value, minValue: minValue, maxValue: maxValue});
        this.initRollers();
        this.progressBar.setMinMax(minValue, maxValue);
        this.progressBar.setPosition(value);

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

    // createRollers(options: {step: number, value: { left: number, right?: number }, minValue: number, maxValue: number}) {
    //     const $scale = this.getScaleElem();
    //     if (this.sliderType === 'range' && options.value.right) {
    //         const leftRoller = new Roller($scale, 'left', options.value.left, options.step, options.minValue, options.maxValue, this.handleChangeValue);
    //         const rightRoller = new Roller($scale, 'right', options.value.right, options.step, options.minValue, options.maxValue, this.handleChangeValue);
    //         this.addRoller(leftRoller);
    //         this.addRoller(rightRoller);
    //     } else {
    //         const roller = new Roller($scale, 'left', options.value.left, options.step, options.minValue, options.maxValue, this.handleChangeValue);
    //         this.addRoller(roller);
    //     }
    // }

    createRollers(options: {step: number, value: { left: number, right?: number }, minValue: number, maxValue: number}) {
        let{step, value, minValue, maxValue,} = options;
        const $scale = this.getScaleElem();
        const rollerOptions = {
            $scale: $scale,
            typeRoller: 'left',
            value: value.left,
            step: step,
            minValue: minValue,
            maxValue: maxValue,
            handleChangeValue: this.handleChangeValue
        };
        if (this.sliderType === 'range' && value.right) {
            
            const leftRoller = new Roller(rollerOptions);
            const rightRoller = new Roller({...rollerOptions, ...{typeRoller: 'right', value: value.right}});
            this.addRoller(leftRoller);
            this.addRoller(rightRoller);
        } else {
            const roller = new Roller(rollerOptions);
            this.addRoller(roller);
        }
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
