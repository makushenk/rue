const {testFromString} = require("./utils")


function test() {
    testFromString(`
        (begin
            (import math)
            
            (prop math MAX)
        )
    `, 1000)
}

module.exports = test;