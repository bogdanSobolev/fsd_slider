import scaleTmp from '../tmps/scale/scale.html';
import '../tmps/scale/scale.scss';

export default class Scale {
    constructor(){
        this.$rootElem = null;
        this.$scale = null;
    }

    init($rootElem){
        this.setRootElem($rootElem);
        this.createScale($rootElem);
    }

    setRootElem($rootElem){
        this.$rootElem = $rootElem;
    }
    
    createScale(){
        this.render();
        this.setScale();
    }

    setScale(){
        let $scaleElem = this.$rootElem.find('.fsd-slider__scale');
        this.$scale = $scaleElem;
    }

    getScale(){
        return this.$scale;
    }

    render(){
        // console.log(this.$rootElem);
        this.$rootElem.html(scaleTmp);
    }
}