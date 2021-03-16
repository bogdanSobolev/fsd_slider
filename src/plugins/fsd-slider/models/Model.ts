import $ from 'jquery';

import Observable from '../observable/Observable';
import {defaultOptions} from '../defaultOptions';
import {Options, UserOptions} from '../types';
import value from '*.html';

export default class Model extends Observable {
    mod: string;

    maxValue: number;

    minValue: number;

    value: { left: number, right?: number };

    step: number;

    // popper: boolean;

    // stepScale: boolean;

    constructor(options?: UserOptions) {
        super();
        this.mod = options?.mod ? this.setMod(options.mod) : defaultOptions.mod;
        this.step = options?.step ? this.setStep(options.step) : defaultOptions.step;
        this.maxValue = options?.maxValue ? this.setMaxValue(options.maxValue) : defaultOptions.maxValue;
        this.minValue = options?.minValue ? this.setMinValue(options.minValue) : defaultOptions.minValue;
        this.value = options?.value ? this.setValue(options.value) : defaultOptions.value;
        this.handleUpdatedValue = this.handleUpdatedValue.bind(this);
    }

    init() {
        console.log(this.mod);
        return {
            mod: this.mod,
            maxValue: this.maxValue,
            minValue: this.minValue,
            value: this.value,
            step: this.step,
        };
    }

    setMod(value: string){
        if(value === 'range' || value === 'single'){
            this.mod = value;
            
        } else {
            this.mod = defaultOptions.mod;
            // return this.mod
        }
        return this.mod
    }

    setStep(value: number | string){
        const valueNum: number = Number(value);
        if(valueNum){
            this.step = valueNum;
        } else {
            this.step = defaultOptions.step;
        }
        return this.step
    }

    setMinValue(value: number | string){
        const valueNum: number = Number(value);
        if(valueNum){
            this.minValue = valueNum;
        } else {
            this.minValue = defaultOptions.minValue;
        }
        return this.minValue;
    }

    setMaxValue(value: number | string){
        const valueNum: number = Number(value);
        if(valueNum){
            this.maxValue = valueNum;
        } else {
            this.maxValue = defaultOptions.maxValue;
        }
        return this.maxValue;
    }

    setValue(value: number | string | {left: number | string, right: number | string}){
        if (this.mod == 'range' && typeof value == 'object'){
            const valueObjNumbers: {left: number, right: number} = {
                left: Number(value.left),
                right: Number(value.right)
            }
            if(valueObjNumbers.left && valueObjNumbers.right){
                this.value = { left: valueObjNumbers.left, right: valueObjNumbers.right };
            } else {
                this.value = defaultOptions.value;
            }
        } else {
            const valueNum = Number(value);
            if(valueNum){
                this.value = { left: valueNum };
            }
        }
        console.log(this.value);
        return this.value;
    }

    // setValue(value: number[]) {
    //     if(value[1]){
    //         this.value = { left: value[0], right: value[1] };
    //     } else {
    //         this.value = { left: value[0]};
    //     }

    // }

    handleUpdatedValue() {
        this.broadcast('updatedValue');
    }

    updateValue(value: number[]) {
        // this.setValue(value);
        if(value[1]){
            this.value = { left: value[0], right: value[1] };
        } else {
            this.value = { left: value[0]};
        }
        this.handleUpdatedValue();
    }

    getValue() {
        return this.value;
    }
}
