import $ from 'jquery';
import '../tmps/view/fsd-slider.scss';
import Observable from '../observable/Observable';
import Scale from './Scale';
import Roller from './Roller';
 

export default class View extends Observable{
    constructor($rootInput){
        super();
        this.value = null;
        this.$rootInput = $rootInput;
        this.$rootElem = null;
        this.sliderType = null;
        this.handleChangeRootInput = this.handleChangeRootInput.bind(this);
        this.scale = new Scale();
        this.rollers = []; // typeRoller
    }

    init(value, sliderType){
        this.$rootInput.val(value);
        this.setSliderType(sliderType);
        this.initRootElem();
        this.scale.init(this.$rootElem);
        this.createRollers();
        this.initRollers();



        this.bindEventListeners();
    }

    setSliderType(sliderType){
        sliderType ? this.sliderType = sliderType : this.sliderType = this.sliderType;
    }

    createRollers(){
        if(this.sliderType == 'range'){
            const leftRoller = new Roller('left', 25);
            const rightRoller = new Roller('right', 75);
            this.addRoller(leftRoller);
            this.addRoller(rightRoller);
        } else {
            const roller = new Roller('left', 25);
            this.addRoller(roller);
        }
    }

    addRoller(roller){
        this.rollers.push({roller: roller});
    }

    initRollers(){
        this.rollers.forEach(item => {
            item.roller.init(this.scale.getScale());
        });
    }

    bindEventListeners(){
        this.$rootInput.on("change", this.handleChangeRootInput);
    }

    handleChangeRootInput(e){
        this.broadcast("changeInput");
    }

    getValue(){
        return this.$rootInput.val();
    }

    consoleVal(){
        console.log(this.getValue());
    }

    initRootElem(){
        let $rootElem = this.createRootElem();
        this.renderRootElem($rootElem);
        this.setRootElem($rootElem);
    }

    createRootElem(){
        let $rootElem = $('<div class="fsd-slider"></div>');
        return $rootElem;
    }

    renderRootElem($rootElem){
        this.$rootInput.after($rootElem);
    }

    setRootElem($rootElem){
        this.$rootElem = $rootElem;
    }
}