import $ from 'jquery';

import Roller from './Roller';

describe('Тест Roller', () => {
    let $scale: JQuery = $('<div></div>');
    let options = {
        $scale: $scale,
        typeRoller: 'left',
        value: 23,
        step: 3,
        minValue: 20,
        maxValue: 42
    }
    let roller = new Roller(options);

    beforeEach(() => {
        $scale = $('<div></div>');
        options = {
            $scale: $scale,
            typeRoller: 'left',
            value: 23,
            step: 3,
            minValue: 20,
            maxValue: 42
        }
        roller = new Roller(options);
    });

    describe('Инициализация $rollerElem', () => {
        it('Создать элемент из шаблона', () => {
            expect(roller.createRollerElem()).toBeInstanceOf(jQuery);
        })
        it('Добавть элемент в $scale', () => {
            roller.$scale.empty();
            const $rollerElem = roller.createRollerElem();
            roller.renderRollerElem($rollerElem);
            expect($scale.children()[0]).toEqual($rollerElem[0]);
            
        });
        it('Полная инициализация элемента', () => {
            roller.$scale.empty();
            roller.$rollerElem = roller.initRollerElem();
            const $rollerElem = roller.createRollerElem();
            roller.initRollerElem();
            expect(roller.$rollerElem).toEqual($rollerElem);
            expect($scale.children()[0]).toEqual($rollerElem[0]);
        })
    })

    describe('Инициализация $rollerInput', () => {
        it('Установка значения свойства $rollerInput', () => {
            roller.$rollerElem = roller.initRollerElem();
            roller.setRollerInput();
            expect(roller.$rollerInput[0]).toEqual(roller.$rollerElem.find("input[class$='roller-input']")[0])
        });
        it('Установка атрибутов', () => {
            roller.$rollerElem = roller.initRollerElem();
            roller.setRollerInput();
            roller.setOptionsRollerInput();
            const $rollerInput = roller.$rollerInput;
            const rollerElemtAtributes = {
                step: Number($rollerInput.attr('step')),
                minValue: Number($rollerInput.attr('min')),
                maxValue: Number($rollerInput.attr('max')),
            }
            const expectedAtributes = {
                step: options.step,
                minValue: options.minValue,
                maxValue: options.maxValue,
            }
            expect(rollerElemtAtributes).toEqual(expectedAtributes);
        })
        it('Установка value', () => {
            roller.setValueRollerInput();
            expect(Number(roller.$rollerInput.val())).toEqual(roller.value);
        })
        it('Полная инициализация', () => {
            roller.$rollerElem = roller.initRollerElem();
            roller.initRollerInput();
            // expect(roller.$rollerInput[0]).toEqual(roller.$rollerElem.find("input[class$='roller-input']")[0]);
            expect(roller.$rollerInput[0]).toEqual($scale.find("input[class$='roller-input']")[0]);
            const $rollerInput = roller.$rollerInput;
            const rollerElemtAtributes = {
                step: Number($rollerInput.attr('step')),
                minValue: Number($rollerInput.attr('min')),
                maxValue: Number($rollerInput.attr('max')),
            }
            const expectedAtributes = {
                step: options.step,
                minValue: options.minValue,
                maxValue: options.maxValue,
            }
            expect(rollerElemtAtributes).toEqual(expectedAtributes);
        })
    })





    it('Установить значение свойства value', () => {
        roller.setValue(23);
        expect(roller.value).toEqual(23);
    })
    // it('Обновить значение свойства value', () => {

    // })


});