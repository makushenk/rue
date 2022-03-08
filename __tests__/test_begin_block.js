const assert = require("assert");
const {testFromString} = require("./utils");

function test() {
    testFromString(`
        (begin
            (var x 10)
            x
            (var y (+ 1 (+ 2 (* 4 5))))
            (* x y)
        )
    `, 230)

    testFromString(`
        (begin
            (var x 10)
            (begin
                (var x 20)
            )
            x
        )
    `, 10)

    testFromString(`
        (begin
            (var x 10)
            (begin
                x
            )
        )
    `, 10)

    assert.throws(() => testFromString(`
        (begin
            (var y 10)
            (begin
                x
            )
        )
    `), ReferenceError)

    testFromString(`
        (begin
            (var x (* 2 5 ))
            (begin
                (set x 15)
                x
            )
        )
    `, 15)
}

module.exports = test;
