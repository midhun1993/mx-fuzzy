const fuzzer = require('../dist/index').default;
describe("Jaro Winkler", () => {

    let algo = fuzzer('jw', {
        convertToPercentage: true
    });


    test('LD between "FAREMVIEL" and "FARMVILLE" is 97', () => {
        expect(algo.match("FAREMVIEL", "FARMVILLE")).toBe(97);
    });

    test('LD between "Colon Musk" and "Elon Musk MuskLE" is 85', () => {
        expect(algo.match("Elon Musk", "Colon Musk")).toBe(85);
    });

    test('LD between "Mike" and "Mike Walker" is 85', () => {
        expect(algo.match("Mike", "Mike Walker")).toBe(100);
    });
 
})