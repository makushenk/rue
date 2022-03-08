const {testFromString} = require("./utils");

function test() {
    testFromString(`
        (begin
            (var counter 0)
            (var result 0)
            (while  (< counter 10)
                (begin
                    (set result (+ result 1))
                    (set counter (+ counter 1))
                )
            )
        )
    `, 10)
}

module.exports = test;
