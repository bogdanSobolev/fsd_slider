import Model from './Model';
import { defaultOptions } from '../defaultOptions';
// import value from '*.html';

describe('Тест модели', () => {
    const optionsModel = {
        mod: 'range',
        maxValue: 140,
        minValue: 20,
        value: {
            left: 40,
            right: 80,
        },
        step: 1,
    };
    let model: Model = new Model(optionsModel);
    const fakePresenter: any = {
        valueHandleUpdatedValue: false,
        init() {
            model.subscribe('updatedValue', () => {
                this.valueHandleUpdatedValue = true;
            });
        },
    };

    beforeEach(() => {
        model = new Model(optionsModel);
        fakePresenter.init();
    });

    it('Получить параметры для инициализации', () => {
        expect(model.init()).toEqual(optionsModel);
    });

    it('Получить значение value', () => {
        expect(model.getValue()).toEqual(optionsModel.value);
    });

    describe('Установка значений свойств Модели', () => {
        it('Установка значения свойства mod', () => {
            const values = ['range', 'single', 'falseValue'];
            model.setMod(values[0]);
            expect(model.mod).toEqual(values[0]);
            model.setMod(values[1]);
            expect(model.mod).toEqual(values[1]);
            model.setMod(values[2]);
            expect(model.mod).toEqual(defaultOptions.mod);
        });
        it('Установка значения свойства step', () => {
            const values: [number, string, string] = [42, '23', 'falseValue'];
            model.setStep(values[0]);
            expect(model.step).toEqual(values[0]);
            model.setStep(values[1]);
            expect(model.step).toEqual(Number(values[1]));
            model.setStep(values[2]);
            expect(model.step).toEqual(defaultOptions.step);
        });
        it('Установка значения свойства minValue', () => {
            const values: [number, string, string] = [42, '23', 'falseValue'];
            model.setMinValue(values[0]);
            expect(model.minValue).toEqual(values[0]);
            model.setMinValue(values[1]);
            expect(model.minValue).toEqual(Number(values[1]));
            model.setMinValue(values[2]);
            expect(model.minValue).toEqual(defaultOptions.minValue);
        });
        it('Установка значения свойства maxValue', () => {
            const values: [number, string, string] = [42, '23', 'falseValue'];
            model.setMaxValue(values[0]);
            expect(model.maxValue).toEqual(values[0]);
            model.setMaxValue(values[1]);
            expect(model.maxValue).toEqual(Number(values[1]));
            model.setMaxValue(values[2]);
            expect(model.maxValue).toEqual(defaultOptions.maxValue);
        });
        it('Установка значения свойства value', () => {
            const valuesObjects = [
                { left: 23, right: 42 },
                { left: 23, right: '42' },
                { left: 23, right: 'falseValue' },
            ];
            const valuesPrimitives = [
                23,
                '42',
                'falseValue',
            ];
            model.setValue(valuesObjects[0]);
            expect(model.value).toEqual({
                left: Number(valuesObjects[0].left),
                right: Number(valuesObjects[0].right),
            });
            model.setValue(valuesObjects[1]);
            expect(model.value).toEqual({
                left: Number(valuesObjects[1].left),
                right: Number(valuesObjects[1].right),
            });
            expect(() => {
                model.setValue(valuesObjects[2]);
            }).toThrow();
            expect(() => {
                model.setValue(valuesPrimitives[0]);
            }).toThrow();

            model = new Model({ ...optionsModel, ...{ mod: 'single', value: 42 } });

            model.setValue(valuesPrimitives[0]);
            expect(model.value).toEqual({
                left: Number(valuesPrimitives[0]),
            });
            model.setValue(valuesPrimitives[1]);
            expect(model.value).toEqual({
                left: Number(valuesPrimitives[1]),
            });
            expect(() => {
                model.setValue(valuesPrimitives[2]);
            }).toThrow();
            expect(() => {
                model.setValue(valuesObjects[0]);
            }).toThrow();
        });
    });

    describe('Обновить значение value и оповестить подписчиков', () => {
        const testValue = {
            left: 12,
            right: 50,
        };
        it('Установить значение value', () => {
            model.updateValue([testValue.left, testValue.right]);
            expect(model.value).toEqual(testValue);
        });

        it('Оповестить подписчиков', () => {
            model.updateValue([testValue.left, testValue.right]);
            expect(fakePresenter.valueHandleUpdatedValue).toBeTrue();
        });
    });
});
