# Rue

The language that supports binary operations, conditions, loops, functions, classes and modules!

On the other hand it has the weirdest syntax you may find.


The source code is really tiny and simple, so if you want to understand how interpreters work under the hood  - welcome!

## Syntax
The full specification is not ready yet, but you can understand the basic idea from code examples below.

### Conditions
```
        (begin
            (var x 10)
            (var y 0)
            
            (if (> x 10)
                (set y 20)
                (set y 30)
            )
            y
        )
```

### Classes
```
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
```

Thanks to [Dmitry Soshnikov](http://dmitrysoshnikov.com)
