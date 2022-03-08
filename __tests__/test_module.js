const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (module Math
                (begin
                    (def abs (value)
                        (if (< value 0)
                            (- value)
                            value
                        )
                    )
                    
                    (var MAX 1000)
                )
            )
            
            (prop Math MAX)
        )
    `, 1000)
    testFromString(`
        (begin
            (module Math
                (begin
                    (def abs (value)
                        (if (< value 0)
                            (- value)
                            value
                        )
                    )
                    
                    (var MAX 1000)
                )
            )
            
            ((prop Math abs) (- 10))
        )
    `, 10)
}

module.exports = test;