const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (var x 10)
            (++ x)
        )
    `, 11)
    testFromString(`
        (begin
            (var x 10)
            (-- x)
        )
    `, 9)
    testFromString(`
        (begin
            (var x 10)
            (+= x 20)
        )
    `, 30)
    testFromString(`
        (begin
            (var x 10)
            (-= x 20)
        )
    `, -10)
    testFromString(`
        (begin
            (var x 10)
            (*= x 20)
        )
    `, 200)
    testFromString(`
        (begin
            (var x 10)
            (/= x 20)
        )
    `, 0.5)


}

module.exports = test;