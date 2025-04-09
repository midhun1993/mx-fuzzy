const fuzzer = require('./dist/index').default;
console.log(fuzzer);

console.log(fuzzer('ld').match("Hello", "tttttttt"));