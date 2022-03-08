const {testFromString} = require("./utils");

function test() {
    testFromString('(+ 5 3)', 8);
    testFromString('(+ 5 (+ 5 3))', 13);
    testFromString('(+ 1 (+ 2 (* 4 5)))', 23);
    testFromString('(< 5 6)', true);
    testFromString('(< 5 5)', false);
    testFromString('(print 5)', undefined);
}

module.exports = test;
