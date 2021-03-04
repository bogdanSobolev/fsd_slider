import scaleTmp from '../tmps/scale/scale.html';
import '../tmps/scale/scale.scss';


export default class Scale {

    $rootElem: null | JQuery;
    $scale: null | JQuery;

    constructor(){
        this.$rootElem = null;
        this.$scale = null;
    }

    init($rootElem: JQuery){
        this.setRootElem($rootElem);
        this.createScale();
    }

    setRootElem($rootElem: JQuery){
        this.$rootElem = $rootElem;
    }
    
    createScale(){
        this.render();
        this.setScale();
    }

    setScale(){
        if(this.$rootElem){
            let $scaleElem = this.$rootElem.find('.fsd-slider__scale');
            this.$scale = $scaleElem;
        }
    }

    getScale(){
        return this.$scale;
    }

    render(){
        if(this.$rootElem){
            this.$rootElem?.html(scaleTmp);
        }
    }
}