import $ from 'jquery';

import Roller from './Roller';

describe('Тест Roller', () => {
    let $scale: JQuery = $('<div></div>');
    const fakeView: any = {
        handleChangeValue: () => {
            return true;
        }
    }
    let options = {
        $scale: $scale,
        typeRoller: 'left',
        value: 23,
        step: 3,
        minValue: 20,
        maxValue: 42,
        handleChangeValue: fakeView.handleChangeValue,
    }
    let roller = new Roller(options);
    

    beforeEach(() => {
        $scale = $('<div></div>');
        options = {
            $scale: $scale,
            typeRoller: 'left',
            value: 23,
            step: 1,
            minValue: 20,
            maxValue: 42,
            handleChangeValue: fakeView.handleChangeValue,
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

    describe('Работа с $rollerBtn', () => {
        it('Установка $rollerBtn', () => {
            roller.$rollerBtn = $();
            roller.setRollerBtn();
            expect(roller.$rollerBtn[0]).toEqual(roller.$rollerElem.find("div[class$='roller-btn']")[0]);
        });
        it('Обновление позиции', () => {
            roller.$rollerInput.val(25);
            roller.updatePositionRollerBtn();
            expect(roller.value).toEqual(25);
            expect(roller.$rollerBtn?.css('left')).toEqual('22.7273%')

            roller.typeRoller = 'right';
            roller.$rollerInput.val(27);
            roller.updatePositionRollerBtn();
            expect(roller.$rollerBtn?.css('right')).toEqual('68.1818%')
        })
    })

    describe('Работа с value', () => {
        it('Установить значение свойства value', () => {
            roller.setValue(25);
            expect(roller.value).toEqual(25);
        })
        it('Обновить значение свойства value', () => {
            roller.updateValue(25);
            expect(roller.value).toEqual(25);
            expect(Number(roller.$rollerInput.val())).toEqual(25);
        })
        it('Получить значение value', () => {
            expect(roller.getValue()).toEqual(options.value);
        })
    })

    describe('Работа с событиями', () => {
        it('Оповестить View о изменениях', () => {
            expect(roller.handleChangeValue()).toBeTrue();
        })

        it('Обновит позтцию $rollerBtn', () => {
            roller.$rollerInput.val(25);
            roller.inputHandlers();
            expect(roller.value).toEqual(25);
            expect(roller.$rollerBtn?.css('left')).toEqual('22.7273%')
        })

        it('Привязка событий', () => {
            roller.bindEventListeners();
            roller.$rollerInput.val(25);
            roller.$rollerInput.trigger('input');
            expect(roller.value).toEqual(25)
        })
    })
    

    it('Инициализация', () => {
        roller.init();
        expect(roller.$rollerBtn.css('left')).toEqual('13.6364%')
        roller.$rollerInput.val(25);
        roller.$rollerInput.trigger('input');
        expect(roller.value).toEqual(25)
    })
});