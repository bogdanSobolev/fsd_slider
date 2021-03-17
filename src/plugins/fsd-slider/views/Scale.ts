import scaleTmp from '../tmps/scale/scale.html';
import '../tmps/scale/scale.scss';

export default class Scale {
    $rootElem: JQuery;

    $scale: JQuery;

    constructor($roorElem: JQuery) {
        this.$rootElem = $roorElem;
        this.$scale = this.initScale();
    }

    setRootElem($rootElem: JQuery) {
        this.$rootElem = $rootElem;
    }

    initScale() {
        const $scale = this.createScale();
        this.renderScale($scale);
        return $scale;
    }

    createScale() {
        const $scale = $(scaleTmp);
        return $scale;
    }

    renderScale($scale: JQuery) {
        this.$rootElem?.append($scale);
    }

    getScale() {
        return this.$scale;
    }
}
