const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (var x 10)
            (switch
                ((< x 10) (print "<"))
                ((> x 10) (print ">"))
                (else 10)
            )
        )
    `, 10)
}

module.exports = test;