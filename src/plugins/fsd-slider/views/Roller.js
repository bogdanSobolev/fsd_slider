import $ from 'jquery';
import rollerTmp from '../tmps/roller/fsd-slider__roller.html';
import '../tmps/roller/fsd-slider__roller.scss';


export default class Roller{
    constructor(typeRoller, value, handleChangeValue){
        this.$scale = null;
        this.$rollerElem = null;
        this.$rollerInput = null;
        this.$rollerBtn = null;
        this.typeRoller = typeRoller ? typeRoller : null;
        this.sliderMinValue = 0; //model
        this.sliderMaxValue = 100; //model
        this.value = value; //model
        this.handleChangeValue = handleChangeValue ? handleChangeValue : null;
    }

    init($scale){
        this.setScale($scale);
        this.initRollerElem();
    }

    setScale($scale){
        this.$scale = $scale;
    }

    initRollerElem(){
        let $rollerElem = this.createRollerElem();
        this.renderRollerElem($rollerElem);
        this.setRollerElem($rollerElem);
        this.setRollerInput();
        this.setValueRollerInput();
        this.setRollerBtn();
        this.updatePositionRollerBtn();

        this.$rollerInput.on('input', (e) => {
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

    renderRollerElem($rollerElem){
        this.$scale.append($rollerElem);
    }

    setRollerElem($rollerElem){
        this.$rollerElem = $rollerElem;
    }

    setValue(value){
        this.value = value;
    }

    // setValueRollerInput(value){
    //     value ? this.$rollerInput.val(value) : this.$rollerInput.val(this.value);
    // }
    setValueRollerInput(){
        this.$rollerInput.val(this.value);
    }

    updateValue(value){
        if(value){
            this.setValue(value);
            this.setValueRollerInput();
        } else {
            this.setValue(this.$rollerInput.val())
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
        // let percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        this.updateValue();
        let percent = ((this.value - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        if(this.typeRoller == 'right'){
            this.$rollerBtn.css('right', (100 - percent) + "%");
        } else {
            this.$rollerBtn.css('left', percent + '%');
        }
        // let percent = ((this.$rollerInput.val() - this.sliderMinValue) / (this.sliderMaxValue - this.sliderMinValue)) * 100;
        // this.$rollerBtn.css('left', percent + '%');
    }
}