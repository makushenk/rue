const assert = require("assert");
const Parser = require("../parser/parser");
const {eval} = require("../rue/eval");

function testFromString(code, expected) {
    const exp = Parser.parse(code);
    assert.strictEqual(eval(exp), expected);
}

module.exports = {
    testFromString
}
