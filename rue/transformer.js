class Transformer {

    funcDefToLambda(expression) {
        const [_, name, params, body] = expression;
        return ['var', name, ['lambda', params, body]];
    }
    switchToIf(expression) {
        const [_, ...cases] = expression;

        const ifExpression = ['if', null, null, null]
        let currentIf = ifExpression

        cases
            .slice(0, cases.length - 1)
            .forEach((_case, index) => {
                const [condition, body] = _case;
                currentIf[1] = condition;
                currentIf[2] = body

                const nextCase = cases[index + 1];
                const [nextCond, nextBody] = nextCase;

                currentIf[3] = nextCond === 'else' ? nextBody : ['if']
                currentIf = currentIf[3]
        })

        return ifExpression;
    }
    forToWhile(expression) {
        const [_, init, condition, modifier, body] = expression;
        return [
            'begin',
            init,
            [
                'while',
                condition,
                ['begin', body, modifier]
            ]
        ]
    }
    plusEqualToSet(expression) {
        const [_, a, b] = expression;
        return ['set', a, ['+', a, b]]
    }
    minusEqualToSet(expression) {
        const [_, a, b] = expression;
        return ['set', a, ['-', a, b]]
    }
    multiplyEqualToSet(expression) {
        const [_, a, b] = expression;
        return ['set', a, ['*', a, b]]
    }
    divideEqualToSet(expression) {
        const [_, a, b] = expression;
        return ['set', a, ['/', a, b]]
    }
    incrementToSet(expression) {
        const [_, name] = expression;
        return ['set', name, ['+', name, 1]]
    }
    decrementToSet(expression) {
        const [_, name] = expression;
        return ['set', name, ['-', name, 1]]
    }
}

module.exports = Transformer;
