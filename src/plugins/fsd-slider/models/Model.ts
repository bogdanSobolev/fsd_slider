// import $ from 'jquery';

import Observable from '../observable/Observable';
import { defaultOptions } from '../defaultOptions';
import { UserOptions } from '../types';
// import value from '*.html';

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
        this.maxValue = options?.maxValue
            ? this.setMaxValue(options.maxValue)
            : defaultOptions.maxValue;
        this.minValue = options?.minValue
            ? this.setMinValue(options.minValue)
            : defaultOptions.minValue;
        this.value = options?.value ? this.setValue(options.value) : defaultOptions.value;
        this.handleUpdatedValue = this.handleUpdatedValue.bind(this);
    }

    init() {
        return {
            mod: this.mod,
            maxValue: this.maxValue,
            minValue: this.minValue,
            value: this.value,
            step: this.step,
        };
    }

    setMod(value: string) {
        const isValidValueMod: boolean = value === 'range' || value === 'single';
        if (isValidValueMod) {
            this.mod = value;
        } else {
            this.mod = defaultOptions.mod;
        }
        return this.mod;
    }

    setStep(value: number | string) {
        const valueNum: number = Number(value);
        if (valueNum) {
            this.step = valueNum;
        } else {
            this.step = defaultOptions.step;
        }
        return this.step;
    }

    setMinValue(value: number | string) {
        const valueNum: number = Number(value);
        if (valueNum) {
            this.minValue = valueNum;
        } else {
            this.minValue = defaultOptions.minValue;
        }
        return this.minValue;
    }

    setMaxValue(value: number | string) {
        const valueNum: number = Number(value);
        if (valueNum) {
            this.maxValue = valueNum;
        } else {
            this.maxValue = defaultOptions.maxValue;
        }
        return this.maxValue;
    }

    setValue(value: number | string | { left: number | string, right: number | string }) {
        const isModRange = this.mod === 'range';
        if (isModRange) {
            if (typeof value === 'object') {
                const valueObjNumbers: { left: number, right: number } = {
                    left: Number(value.left),
                    right: Number(value.right),
                };
                const isValueObjectNumbersValuesDefined = valueObjNumbers.left && valueObjNumbers.right;
                if (isValueObjectNumbersValuesDefined) {
                    this.value = { left: valueObjNumbers.left, right: valueObjNumbers.right };
                } else {
                    throw new TypeError('Свойства value left и right должны быть либо числом, либо строками содержащими числа');
                }
            } else {
                throw new TypeError('Для слайдера типа range необходим объект со свойствами left и right');
            }
        } else {
            const valueNum = Number(value);
            if (valueNum) {
                this.value = { left: valueNum };
            } else {
                throw new TypeError('Свойство value должно быть числом или строкой с числом');
            }
        }
        return this.value;
    }

    handleUpdatedValue() {
        this.broadcast('updatedValue');
    }

    updateValue(value: number[]) {
        if (value[1]) {
            this.value = { left: value[0], right: value[1] };
        } else {
            this.value = { left: value[0] };
        }
        this.handleUpdatedValue();
    }

    getValue() {
        return this.value;
    }
}
