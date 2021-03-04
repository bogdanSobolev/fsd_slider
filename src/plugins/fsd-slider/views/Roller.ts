import $ from 'jquery';
import rollerTmp from '../tmps/roller/fsd-slider__roller.html';
import '../tmps/roller/fsd-slider__roller.scss';


export default class Roller{
    $scale: null | JQuery;
    $rollerElem: null | JQuery;
    $rollerInput: null | JQuery;
    $rollerBtn: null | JQuery;
    typeRoller: null | string;
    sliderMinValue: number; //model
    sliderMaxValue: number; //model
    value: number; //model
    step: number;
    handleChangeValue?: any; // Изменить на обязательное свойство

    constructor(typeRoller: string, value: number, step: number, minValue: number, maxnValue: number, handleChangeValue?: any){
        this.$scale = null;
        this.$rollerElem = null;
        this.$rollerInput = null;
        this.$rollerBtn = null;
        this.typeRoller = typeRoller ? typeRoller : null;
        this.sliderMinValue = minValue; //model
        this.sliderMaxValue = maxnValue; //model
        this.value = value;
        this.step = step;
        this.handleChangeValue = handleChangeValue ? handleChangeValue : null;
    }

    init($scale: JQuery){
        this.setScale($scale);
        this.initRollerElem();
    }

    setScale($scale: JQuery){
        this.$scale = $scale;
    }

    initRollerElem(){
        let $rollerElem = this.createRollerElem();
        this.renderRollerElem($rollerElem);
        this.setRollerElem($rollerElem);
        this.setRollerInput();
        this.setOptionsRollerInput();
        this.setValueRollerInput();
        this.setRollerBtn();
        this.updatePositionRollerBtn();

        this.$rollerInput?.on('input', (e) => {
            this.updatePositionRollerBtn();
            this.handleChangeValue();
        });
    }

    createRollerElem(){
        let $rollerElem = $(rollerTmp);
        if(this.typeRoller){
            $rollerElem.addClass('fsd-slider__roller_type_' + this.typeRoller);
        }
        return $rollerElem;
    }

    renderRollerElem($rollerElem: JQuery){
        this.$scale?.append($rollerElem);
    }

    setRollerElem($rollerElem: JQuery){
        this.$rollerElem = $rollerElem;
    }

    setValue(value: number){
        this.value = value;
    }

    setOptionsRollerInput(){
        this.$rollerInput?.attr('step', this.step);
        this.$rollerInput?.attr('min', this.sliderMinValue);
        this.$rollerInput?.attr('max', this.sliderMaxValue);
    }

    setValueRollerInput(){
        this.$rollerInput?.val(this.value);
    }

    updateValue(value?: number){
        if(value){
            this.setValue(value);
            this.setValueRollerInput();
        } else {
            let inputValueStr: any = this.$rollerInput?.val() ? this.$rollerInput?.val() : null;
            
            if(inputValueStr){
                let inputValueInt: number = Number(inputValueStr);
                this.setValue(inputValueInt);
            }
            
        }
       
    }

    setRollerInput(){
        if(this.$rollerElem){
            this.$rollerInput = this.$rollerElem.find('.fsd-slider__roller-input');
        }
    }

    setRollerBtn(){
        if(this.$rollerElem){
            this.$rollerBtn = this.$rollerElem.find('.fsd-slider__roller-btn');
        }
    }

    // setValue() {
    //     // var _this = inputLeft,                                                          //
    //     //     min = parseInt(_this.min),                                                  //
    //     //     max = parseInt(_this.max);                                                  //
    //     // _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);  //позже
    
    //     let percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
    
    //     thumbLeft.style.left = percent + "%";
    //     // range.style.left = percent + "%";  //позже
    // }

    

    getValue(){
        return this.value;
    }

    updatePositionRollerBtn(){
        this.updateValue();
        let percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        if(this.typeRoller == 'right'){
            this.$rollerBtn?.css('right', (100 - percent) + "%");
        } else {
            this.$rollerBtn?.css('left', percent + '%');
        }
    }
}
