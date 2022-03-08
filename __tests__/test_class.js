const {testFromString} = require("./utils");


function test() {
    testFromString(`
        (begin
            (class Circle null
                (begin
                    (def init (self x y r)
                        (begin
                            (set (prop self x) x)
                            (set (prop self y) y)
                            (set (prop self r) r)
                        )
                    )
                    
                    (def area (self)
                        (* 3 (* (prop self r) (prop self r) ))                    
                    ) 
                )
            )
            
            (var c (new Circle 0 0 10))
            ((prop c area) c)
        )
    
    `, 300);

    testFromString(`
        (begin
            (class Animal null
                (begin
                    (def init (self name)
                        (begin
                            (set (prop self name) name)
                        )
                    )
                )
            )
            
            (class Cat Animal
                (begin
                    (def init (self name color)
                        (begin
                            ((prop (super Cat) init) self name )
                            (set (prop self color) color)
                        )
                    )
                    
                    (def say ()
                        "meow"
                    )
                )
            )
            
            (var c (new Cat "Lola" "black"))
            ((prop c say))
        )
    `, "meow")
}

module.exports = test;
