import Model from './ModelT.js';

describe("Тест модели", function() {
    const model = new Model();
  
    it("Получаем значение value", function() {
        const value = {
            left: 40,
            right: 80,
        };
  
        expect(model.getValue()).toBe(value);
    });
  });