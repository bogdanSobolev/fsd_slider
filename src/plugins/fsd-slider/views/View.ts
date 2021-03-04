import $ from 'jquery';
import '../tmps/view/fsd-slider.scss';
import Observable from '../observable/Observable';
import Scale from './Scale';
import Roller from './Roller';
import ProgressBar from './ProgressBar';


export default class View extends Observable{
    // value: null | {left: number, right: number};
    // step: null | number;
    $rootInput: JQuery;
    $rootElem: null | JQuery;
    sliderType: null | string;
    scale: Scale;
    rollers: {roller: Roller}[];
    progressBar: ProgressBar;


    constructor($rootInput: JQuery){
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

    init(options: any){ // заменить 
        // this.setValue(options.value);
        this.$rootInput.val(options.value?.left + " -- " + options.value?.right);// заглушка
        this.setSliderType(options.mod);
        
        this.createRollers(options.step, options.value, options.minValue, options.maxValue);
        this.initRollers();
        // this.progressBar.init(this.value);
        this.progressBar.setMinMax(options.minValue, options.maxValue);
        this.progressBar.setPosition(options.value);

        this.bindEventListeners();
    }

    updateValue(value: {left: number, right: number}){
        // this.setValue(value);
        this.$rootInput.val(value.left + " -- " + value.right);
        // this.progressBar.init(value);
        this.progressBar.setPosition(value);
    }

    setSliderType(sliderType: string){
        sliderType ? this.sliderType = sliderType : this.sliderType = this.sliderType;
    }

    createRollers(step: number, value: {left: number, right: number}, minValue: number, maxValue: number){
        let $scale = this.getScaleElem();
        if(this.sliderType == 'range'){
            const leftRoller = new Roller($scale, 'left', value.left, step, minValue, maxValue, this.handleChangeValue);
            const rightRoller = new Roller($scale, 'right', value.right, step, minValue, maxValue, this.handleChangeValue);
            this.addRoller(leftRoller);
            this.addRoller(rightRoller);            
        }
        //  else {
        //     const roller = new Roller('left', this.value);
        //     this.addRoller(roller);
        // }                                                      // single mod
    }

    handleChangeValue(){
        this.broadcast("changeValue");
    }

    getValue(){
        let newValue: number[] = [];
        this.rollers.forEach((item: {roller: Roller}) => {
            newValue.push(item.roller.getValue());
        });
        return newValue;
    }

    getScaleElem(){
        return this.scale.getScale();
    }

    addRoller(roller: Roller){
        this.rollers.push({roller: roller});
    }

    initRollers(){
        this.rollers.forEach(item => {
            item.roller.init();
        });
    }

    bindEventListeners(){
        this.$rootInput.on("change", this.handleChangeRootInput);
    }

    handleChangeRootInput(){
        this.broadcast("changeInput");
    }

    consoleVal(){
        console.log(this.getValue());
    }

    initRootElem(){
        let $rootElem = this.createRootElem();
        this.renderRootElem($rootElem);
        return $rootElem;
        // this.setRootElem($rootElem);
    }

    createRootElem(){
        let $rootElem = $('<div class="fsd-slider"></div>');
        return $rootElem;
    }

    renderRootElem($rootElem: JQuery){
        this.$rootInput.after($rootElem);
    }

    setRootElem($rootElem: JQuery){
        this.$rootElem = $rootElem;
    }
}