import Observable from "../observable/Observable";

export default class Model extends Observable{
    mod: string;
    maxValue: number;
    minValue: number;
    value: {left: number, right: number};


    constructor(){
        super();
        this.mod = 'range';
        this.maxValue = 100;
        this.minValue = 20;
        this.value = {
            left: 40,
            right: 100
        };
        this.handleUpdatedValue = this.handleUpdatedValue.bind(this);
    }

    init(){
        return {
            mod : this.mod,
            maxValue : this.maxValue,
            minValue : this.minValue,
            value : this.value,
        }
    }

    setValue(value: number[]){
        this.value = {left: value[0], right: value[1]}
    }

    handleUpdatedValue(){
        this.broadcast("updatedValue");
    }

    updateValue(value: number[]){
        this.setValue(value);
        this.handleUpdatedValue();
    }

    getValue(){
        return this.value;
    }
}