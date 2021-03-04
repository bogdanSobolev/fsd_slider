import scaleTmp from '../tmps/scale/scale.html';
import '../tmps/scale/scale.scss';


export default class Scale {

    $rootElem: JQuery;
    $scale: JQuery;

    constructor($roorElem: JQuery){
        this.$rootElem = $roorElem;
        this.$scale = this.initScale();
    }

    // init(){
    //     // this.setRootElem($rootElem);
    //     // this.createScale();
    // }

    setRootElem($rootElem: JQuery){
        this.$rootElem = $rootElem;
    }
    
    // createScale(){
    //     this.render();
    //     this.setScale();
    // }

    initScale(){
        // this.render();
        // this.setScale();
        let $scale = this.createScale();
        this.renderScale($scale);
        return $scale;
    }

    createScale(){
        let $scale = $(scaleTmp);
        return $scale;
    }

    renderScale($scale: JQuery){
        this.$rootElem?.append($scale);
    }

    // setScale(){
    //     if(this.$rootElem){
    //         let $scaleElem = this.$rootElem.find('.fsd-slider__scale');
    //         this.$scale = $scaleElem;
    //     }
    // }

    getScale(){
        return this.$scale;
    }

    // render(){
    //     if(this.$rootElem){
    //         this.$rootElem?.html(scaleTmp);
    //     }
    // }
}