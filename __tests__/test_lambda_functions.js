const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (def test (callback)
                (begin
                    (var x 10)
                    (var y 20)
                    (callback (+ x y))
                )
            )

            (test (lambda (data) (* data 10)))
        )
    `, 300)
    testFromString('((lambda (a) (* a a)) 2)', 4)
}

module.exports = test;