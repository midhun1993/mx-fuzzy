const fuzzer = require('../dist/index').default;
describe("Levenshtein Distance: Optimal String Alignment Distance", () => {

    let algo = fuzzer('dl');


    test('LD between "Elon Musk" and "Colon Musk" is 2', () => {
        expect(algo.match("Elon Musk", "Colon Musk")).toBe(2);
    });

    test('LD between "Elon Musk" and "Colosdsn Musk" is 5', () => {
        expect(algo.match("Elon Musk", "Colosdsn Musk")).toBe(5);
    });

    test('LD between "Midhun" and "Asha" is 5', () => {
        expect(algo.match("Midhun", "Asha")).toBe(5);
    });
   
})