import $ from 'jquery';
import '../tmps/view/fsd-slider.scss';
import Observable from '../observable/Observable';
import Scale from './Scale';
import Roller from './Roller';


export default class View extends Observable{
    value: null | {left: number, right: number};
    $rootInput: JQuery;
    $rootElem: null | JQuery;
    sliderType: null | string;
    scale: Scale;
    rollers: {roller: Roller}[];


    constructor($rootInput: JQuery){
        super();
        this.value = null;
        this.$rootInput = $rootInput;
        this.$rootElem = null;
        this.sliderType = null;
        this.handleChangeRootInput = this.handleChangeRootInput.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.scale = new Scale();
        this.rollers = []; // typeRoller
    }

    init(options: any){ // заменить 
        this.setValue(options.value);
        if(this.value){
            this.$rootInput.val(this.value.left + " -- " + this.value.right);// заглушка
        }
        this.setSliderType(options.mod);
        this.initRootElem();
        this.scale.init(this.$rootElem);
        this.createRollers();
        this.initRollers();

        this.bindEventListeners();
    }

    updateValue(value: {left: number, right: number}){
        this.setValue(value);
        if(this.value){
            this.$rootInput.val(this.value.left + " -- " + this.value.right);
        }
        
    }

    setSliderType(sliderType: string){
        sliderType ? this.sliderType = sliderType : this.sliderType = this.sliderType;
    }

    setValue(value: {left: number, right: number}){
        this.value = value;
    }

    createRollers(){
        if(this.sliderType == 'range'){
            if(this.value){
                const leftRoller = new Roller('left', this.value.left, this.handleChangeValue);
                const rightRoller = new Roller('right', this.value.right, this.handleChangeValue);
                this.addRoller(leftRoller);
                this.addRoller(rightRoller);
            }
            
        } else {
            const roller = new Roller('left', this.value);
            this.addRoller(roller);
        }
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

    addRoller(roller: Roller){
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

    handleChangeRootInput(){
        this.broadcast("changeInput");
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

    renderRootElem($rootElem: JQuery){
        this.$rootInput.after($rootElem);
    }

    setRootElem($rootElem: JQuery){
        this.$rootElem = $rootElem;
    }
}



// export default class View extends Observable{
//     constructor($rootInput){
//         super();
//         this.value = null;
//         this.$rootInput = $rootInput;
//         this.$rootElem = null;
//         this.sliderType = null;
//         this.handleChangeRootInput = this.handleChangeRootInput.bind(this);
//         this.handleChangeValue = this.handleChangeValue.bind(this);
//         this.scale = new Scale();
//         this.rollers = []; // typeRoller
//     }

//     init(options){
//         this.setValue(options.value);
//         this.$rootInput.val(this.value.left + " -- " + this.value.right);// заглушка
//         this.setSliderType(options.mod);
//         this.initRootElem();
//         this.scale.init(this.$rootElem);
//         this.createRollers();
//         this.initRollers();

//         this.bindEventListeners();
//     }

//     updateValue(value){
//         this.setValue(value);
//         this.$rootInput.val(this.value.left + " -- " + this.value.right);
//     }

//     setSliderType(sliderType){
//         sliderType ? this.sliderType = sliderType : this.sliderType = this.sliderType;
//     }

//     setValue(value){
//         this.value = value;
//     }

//     createRollers(){
//         if(this.sliderType == 'range'){
//             const leftRoller = new Roller('left', this.value.left, this.handleChangeValue);
//             const rightRoller = new Roller('right', this.value.right, this.handleChangeValue);
//             this.addRoller(leftRoller);
//             this.addRoller(rightRoller);
//         } else {
//             const roller = new Roller('left', this.value);
//             this.addRoller(roller);
//         }
//     }

//     handleChangeValue(){
//         this.broadcast("changeValue");
//     }

//     getValue(){
//         let newValue = [];
//         this.rollers.forEach((item) => {
//             newValue.push(item.roller.getValue());
//         });
//         return newValue;
//     }

//     addRoller(roller){
//         this.rollers.push({roller: roller});
//     }

//     initRollers(){
//         this.rollers.forEach(item => {
//             item.roller.init(this.scale.getScale());
//         });
//     }

//     bindEventListeners(){
//         this.$rootInput.on("change", this.handleChangeRootInput);
//     }

//     handleChangeRootInput(e){
//         this.broadcast("changeInput");
//     }

//     consoleVal(){
//         console.log(this.getValue());
//     }

//     initRootElem(){
//         let $rootElem = this.createRootElem();
//         this.renderRootElem($rootElem);
//         this.setRootElem($rootElem);
//     }

//     createRootElem(){
//         let $rootElem = $('<div class="fsd-slider"></div>');
//         return $rootElem;
//     }

//     renderRootElem($rootElem){
//         this.$rootInput.after($rootElem);
//     }

//     setRootElem($rootElem){
//         this.$rootElem = $rootElem;
//     }
// }