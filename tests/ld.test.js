const fuzzer = require('../dist/index').default;
describe("Levenshtein Distance", () => {

    let algo = fuzzer('ld');


    test('LD between "sitting" and "kitten" is 3', () => {
        expect(algo.match("sitting", "kitten")).toBe(3);
    });

    test('LD between "love" and "hate" is 3', () => {
        expect(algo.match("love", "hate")).toBe(3);
    });

    test('LD between "redbull" and "pepsi" is 6', () => {
        expect(algo.match("redbull", "pepsi")).toBe(6);
    });
    
})