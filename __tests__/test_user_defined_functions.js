const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (def square (x)
                (* x x)
            )
            
            (square 2)
        )
    `, 4)

    testFromString(`
        (begin
            (set x 5)
            
            (def square ()
                (* x x)
            )
            
            (square)
        )
    `, 25)


    testFromString(`
        (begin
            (set x 5)
            
            (def square ()
                (* x x)
            )
            
            (set x 10)
            
            (square)
        )
    `, 100)

    testFromString(`
        (begin
            (set x 5)
            
            (def square ()
                (* x x)
            )
            
            (def foo ()
                (var x 10)
                (square)
            )
            (foo)
            
        )
    `, 10);

    testFromString(`
        (begin
            (def f (x)
                (if (<= x 1)
                    x
                    (+ (f (- x 1)) (f (- x 2)))
                )
            )
            
            (f 10)
        )
    `, 55)
}

module.exports = test;
