import Model from './Model';

let model: Model;
let fakePresenter: any;

describe('Тест модели', () => {
    model = new Model();
    fakePresenter = {
        valueHandleUpdatedValue: false,
        init() {
            model.subscribe('updatedValue', () => {
                this.valueHandleUpdatedValue = true;
            });
        },
    };

    beforeEach(() => {
        model = new Model();
        fakePresenter.init();
    });

    it('Получить параметры для инициализации', () => {
        const options = {
            mod: 'range',
            maxValue: 140,
            minValue: 20,
            value: {
                left: 40,
                right: 80,
            },
            step: 4,
        };

        expect(model.init()).toEqual(options);
    });

    it('Получить значение value', () => {
        const value = {
            left: 40,
            right: 80,
        };

        expect(model.getValue()).toEqual(value);
    });

    describe('Обновить значение value и оповестить подписчиков', () => {
        // it("Установить значение value", function () {
        //     const testValue = {
        //         left: 12,
        //         right: 50,
        //     };
        //     model.setValue([testValue.left, testValue.right]);
        //     expect(model.value).toEqual(testValue);
        // });

        const testValue = {
            left: 12,
            right: 50,
        };

        // console.log('TEST KONSOLI');
        // console.log(model);

        // fakePresenter.init();

        it('Установить значение value', () => {
            // fakePresenter.init();
            model.updateValue([testValue.left, testValue.right]);
            expect(model.value).toEqual(testValue);
        });

        it('Оповестить подписчиков', () => {
            // fakePresenter.init();
            // console.log(fakePresenter);;
            model.updateValue([testValue.left, testValue.right]);
            expect(fakePresenter.valueHandleUpdatedValue).toBeTrue();
        });
    });
});
