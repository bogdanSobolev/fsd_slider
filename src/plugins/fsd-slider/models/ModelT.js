import Observable from '../observable/Observable';

export default class Model extends Observable {

    constructor() {
        super();
        this.mod = 'range';
        this.maxValue = 140;
        this.minValue = 20;
        this.value = {
            left: 40,
            right: 80,
        };
        this.step = 4;
        // this.handleUpdatedValue = this.handleUpdatedValue.bind(this);
    }

    init() {
        console.log('model init');
        return {
            mod: this.mod,
            maxValue: this.maxValue,
            minValue: this.minValue,
            value: this.value,
            step: this.step,
        };
        
    }

    getValue() {
        return this.value;
    }
}
