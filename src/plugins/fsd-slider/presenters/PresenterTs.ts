import Model from "../models/Model";
import View from "../views/View";

export default class Presenter{
    view: View;
    model: Model;

    constructor(view: View, model: Model){
        this.view = view;
        this.model = model;
    }

    init(){
        let values = this.model.init();
        console.log(values);

        this.view.init(values); // range
        // this.view.init(5, 'range'); // range

        this.view.subscribe("changeInput", () => {
            this.view.consoleVal();
        });

        this.view.subscribe("changeValue", () => {

            // this.view.consoleVal();
            // console.log(this.view.getValue());
            this.model.updateValue(this.view.getValue());
        });

        this.model.subscribe("updatedValue", () => {

            this.view.updateValue(this.model.getValue());
            // console.log('updated');
        });
    }
}