import $ from 'jquery';

import Observable from '../observable/Observable';
import { Options } from '../types';
import Scale from './Scale';
import Roller from './Roller';
import ProgressBar from './ProgressBar';
import '../tmps/view/fsd-slider.scss';

export default class View extends Observable {
    $rootInput: JQuery;

    $rootElem: null | JQuery;

    sliderType: null | string;

    scale: Scale;

    rollers: { roller: Roller }[];

    progressBar: ProgressBar;

    constructor($rootInput: JQuery) {
        super();
        this.$rootInput = $rootInput;
        this.$rootElem = this.initRootElem();
        this.sliderType = null;
        this.scale = new Scale(this.$rootElem);
        this.progressBar = new ProgressBar(this.getScaleElem());
        this.rollers = [];
    }

    init(options: Options) {
        const {
            mod, value, step, minValue, maxValue,
        } = options;
        this.setSliderType(mod);
        if (this.sliderType === 'range') {
            this.$rootInput.val(`${value?.left} -- ${value?.right}`);// заглушка //setRootInputValue()
        } else {
            this.$rootInput.val(`${value?.left}`);// заглушка //etRootInputValue()
        }
        this.createRollers({
            step, value, minValue, maxValue,
        });
        this.initRollers();
        this.progressBar.setMinMax(minValue, maxValue);
        this.progressBar.setPosition(value);

        this.bindEventListeners();
    }

    updateValue(value: { left: number, right?: number }) {
        if (this.sliderType === 'range') {
            this.$rootInput.val(`${value.left} -- ${value.right}`);
            this.rollers[0].roller.updateValue(value.left);
            this.rollers[1].roller.updateValue(value.right);
        } else {
            this.$rootInput.val(`${value.left}`);
            this.rollers[0].roller.updateValue(value.left);
        }
        this.progressBar.setPosition(value);
    }

    updateOptions(options: Options){
        
    }

    setSliderType(sliderType: string) {
        this.sliderType = sliderType;
    }

    createRollers(options: {
        step: number,
        value: { left: number, right?: number },
        minValue: number,
        maxValue: number
    }) {
        const {
            step, value, minValue, maxValue,
        } = options;
        const $scale = this.getScaleElem();
        const rollerOptions = {
            $scale,
            typeRoller: 'left',
            value: value.left,
            step,
            minValue,
            maxValue,
            handleChangeValue: this.handleChangeValue,
        };
        if (this.sliderType === 'range' && value.right) {
            const leftRoller = new Roller(rollerOptions);
            const rightRoller = new Roller({ ...rollerOptions, ...{ typeRoller: 'right', value: value.right } });
            this.addRoller(leftRoller);
            this.addRoller(rightRoller);
        } else {
            const roller = new Roller(rollerOptions);
            this.addRoller(roller);
        }
    }

    handleChangeValue = () => {
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

    handleChangeRootInput = () => {
        this.broadcast('changeInput');
    }

    consoleVal() {
        console.log(this.getValue());
    }

    initRootElem() {
        const $rootElem = this.createRootElem();
        this.renderRootElem($rootElem);
        return $rootElem;
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
