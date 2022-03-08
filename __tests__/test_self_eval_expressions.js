const {testFromString} = require("./utils");

function test() {
    testFromString('1', 1);
    testFromString('"hello"', 'hello');
}

module.exports = test;
