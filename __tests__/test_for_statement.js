const {testFromString} = require("./utils");

function test() {
    testFromString(`
        (begin
            (for    (var i 0)
                    (< i 10)
                    (++ i)
                    20
            )
        )
    `, 10);
}

module.exports = test;
