import $ from 'jquery';

import ProgressBar from './ProgressBar';

describe('Тест ProgressBar', () => {
    let $scale: JQuery = $('<div></div>');
    let progressBar: ProgressBar = new ProgressBar($scale);

    beforeEach(() => {
        $scale = $('<div></div>');
        progressBar = new ProgressBar($scale);
    });
    
    it('Установить значение свойств sliderMinValue и sliderMaxValue', () => {
        progressBar.setMinMax(10, 115);
        expect(progressBar.sliderMinValue).toEqual(10);
        expect(progressBar.sliderMaxValue).toEqual(115);
    });
    describe('Установить позицию элемента $progressBar', () => {
         it('Посчитать положение в процентах ', () => {
            progressBar.setMinMax(10, 115);
            expect(progressBar.countPersent(15)).toBe(4.7619);
        });
        it('Установить позиции', () => {
            progressBar.setPosition({left: 23, right: 42});
            const elementRangePositionValues = {
                left: progressBar.$progressBar.css('left'),
                right: progressBar.$progressBar.css('right')
            };
            const expectedRangePositionValues = {
                left: `${progressBar.countPersent(23)}%`,
                right: `${100 - progressBar.countPersent(42)}%`,
            }
            expect(elementRangePositionValues).toEqual(expectedRangePositionValues);
            progressBar.setPosition({left: 23});
            const elementSinglePositionValues = {
                left: progressBar.$progressBar.css('left'),
                right: progressBar.$progressBar.css('right')
            };
            const expectedSinglePositionValues = {
                left: '0%',
                right: `${100 - progressBar.countPersent(23)}%`,
            }
            expect(elementSinglePositionValues).toEqual(expectedSinglePositionValues);
        })
    })
    
    describe('Инициализировать элемент $progressBar', () => {
        it('Создать элемент из шаблона', () => {
            expect(progressBar.createProgressBar()).toBeInstanceOf(jQuery);
        });
        it('Добавть элемент в $scale', () => {
            progressBar.$scale.empty();
            const $progressBarElem = progressBar.createProgressBar();
            progressBar.renderProgressBar($progressBarElem);
            expect($scale.find("div[class$='progress-bar']")[0]).toEqual($progressBarElem[0]);
        });
        it('Полная инициализауия элемента', () => {
            progressBar.$scale.empty();
            const $progressBarElem = progressBar.createProgressBar();
            progressBar.initProgressBar();
            expect(progressBar.$progressBar).toEqual($progressBarElem);
            expect($scale.find("div[class$='progress-bar']")[0]).toEqual($progressBarElem[0]);
        })
    })
    
    
});