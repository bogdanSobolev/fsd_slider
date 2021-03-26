import Model from '../models/Model';
import View from '../views/View';

export default class Presenter {
    view: View;

    model: Model;

    constructor(view: View, model: Model) {
        this.view = view;
        this.model = model;
    }

    init() {
        const options = this.model.getOptions();
        this.view.init(options);

        this.view.subscribe('changeInput', () => {
            this.view.consoleVal();
        });

        this.view.subscribe('changeValue', () => {
            // console.log(this.view.getValue());
            this.model.updateValue(this.view.getValue());
        });

        this.model.subscribe('updatedValue', () => {
            this.view.updateValue(this.model.getValue());
        });

        this.model.subscribe('updatedOptions', () => {
            this.view.updateOptions(this.model.getOptions());
        });
    }
}
