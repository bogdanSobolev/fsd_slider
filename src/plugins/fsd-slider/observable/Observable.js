export default class Observable {
    constructor() {
        this.observers = {};
    //   this.subscribe = this.subscribe.bind(this);
    //   this.unsubscribe = this.unsubscribe.bind(this);
    //   this.broadcast = this.broadcast.bind(this);
    }

    subscribe(type, fn) {
        if (this.observers[type] instanceof Array) {
            this.observers[type].push(fn);
        } else {
            this.observers[type] = [fn];
        }
    }

    unsubscribe(type, fn) {
        this.observers[type] = this.observers[type].filter(
            (observer) => observer !== fn,
        );
    }

    broadcast(type, data) {
        //   if (!this._observers[type])
        //     return console.log(`No subscribers for "${type}"`);
        // console.log('this.observers[type]');
        // console.log(this.observers[type]);
        this.observers[type].forEach((observer) => observer(data));
    }
}
// export default class Observable {

//     constructor() {
//         this.observers = [];
//     }

//     subscribe(fn) {
//         console.log(this.observers);
//         this.observers.push(fn);
//     }

//     unsubscribe(fn) {
//         this.observers = this.observers.filter((subscriber) => subscriber !== fn);
//     }

//     broadcast(data) {
//         this.observers.forEach((subscriber) => subscriber(data));
//     }
// }
