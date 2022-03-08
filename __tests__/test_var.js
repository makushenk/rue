const {testFromString} = require("./utils");

function test() {

    testFromString('(var x 10)', 10);
    testFromString(`
        (var x (+ 1 (+ 2 (* 4 5))))
    `, 23);
    testFromString('(var _bool true)', true);
}

module.exports = test;
