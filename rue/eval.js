const Environment = require("./environment");
const Transformer = require("./transformer");
const Parser = require("../parser/parser");

const fs = require("fs");


const OperationCode = {
    NUMBER: "NUMBER",
    STRING: "STRING",

    BEGIN_BLOCK: "BEGIN_BLOCK",
    IF_STMT: "IF_STMT",
    SWITCH_STMT: "SWITCH_STMT",
    WHILE_STMT: "WHILE_STMT",
    FOR_STMT: "FOR_STMT",

    DEF_VAR: "DEV_VAR",
    SET_VAR: "SET_VAR",
    GET_VAR: "GET_VAR",

    FUNC_CALL: "FUNC_CALL",
    FUNC_DEF: "FUNC_DEF",
    LAMBDA_DEF: "LAMBDA_DEF",

    CLASS_DEF: "CLASS_DEF",
    NEW_INSTANCE: "NEW_INSTANCE",
    PROP_ACCESS: "PROP_ACCESS",
    SUPER_CALL: "SUPER_CALL",

    MODULE_DEF: "MODULE_DEF",
    MODULE_IMPORT: "MODULE_IMPORT",

    PLUS_EQUAL: "PLUS_EQUAL",
    MINUS_EQUAL: "MINUS_EQUAL",
    MULTIPLY_EQUAL: "MULTIPLY_EQUAL",
    DIVIDE_EQUAL: "DIVIDE_EQUAL",
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"
}

const astTransformer = new Transformer();

const GLOBAL_ENV = new Environment({
    VERSION: 0.1,

    null: null,
    true: true,
    false: false,

    '+': (a, b) => a + b,
    '-': (a, b = null) => b == null ? -a : a - b,
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '!=': (a, b) => a !== b,
    '==': (a, b) => a === b,
    'print': console.log
}, null, '<global>')


function _getOperationCode(exp) {
    if (typeof exp === "number") {
        return OperationCode.NUMBER;
    }
    else if (typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"') {
        return OperationCode.STRING;
    }
    else if (Array.isArray(exp) && exp[0] === '+=') {
        return OperationCode.PLUS_EQUAL;
    }
    else if (Array.isArray(exp) && exp[0] === '-=') {
        return OperationCode.MINUS_EQUAL;
    }
    else if (Array.isArray(exp) && exp[0] === '*=') {
        return OperationCode.MULTIPLY_EQUAL;
    }
    else if (Array.isArray(exp) && exp[0] === '/=') {
        return OperationCode.DIVIDE_EQUAL;
    }
    else if (Array.isArray(exp) && exp[0] === '++') {
        return OperationCode.INCREMENT;
    }
    else if (Array.isArray(exp) && exp[0] === '--') {
        return OperationCode.DECREMENT;
    }
    else if (Array.isArray(exp) && exp[0] === 'var') {
        return OperationCode.DEF_VAR;
    }
    else if (typeof exp === "string" && /^[+-/*<>=!a-zA-Z0-9_]*$/.test(exp)) {
        return OperationCode.GET_VAR;
    }
    else if (Array.isArray(exp) && exp[0] === 'set') {
        return OperationCode.SET_VAR;
    }
    else if (Array.isArray(exp) && exp[0] === 'begin') {
        return OperationCode.BEGIN_BLOCK;
    }
    else if (Array.isArray(exp) && exp[0] === 'if') {
        return OperationCode.IF_STMT;
    }
    else if (Array.isArray(exp) && exp[0] === 'switch') {
        return OperationCode.SWITCH_STMT;
    }
    else if (Array.isArray(exp) && exp[0] === 'while') {
        return OperationCode.WHILE_STMT;
    }
    else if (Array.isArray(exp) && exp[0] === 'for') {
        return OperationCode.FOR_STMT;
    }
    else if (Array.isArray(exp) && exp[0] === 'def') {
        return OperationCode.FUNC_DEF;
    }
    else if (Array.isArray(exp) && exp[0] === 'lambda') {
        return OperationCode.LAMBDA_DEF;
    }
    else if (Array.isArray(exp) && exp[0] === 'class') {
        return OperationCode.CLASS_DEF;
    }
    else if (Array.isArray(exp) && exp[0] === 'new') {
        return OperationCode.NEW_INSTANCE;
    }
    else if (Array.isArray(exp) && exp[0] === 'prop') {
        return OperationCode.PROP_ACCESS;
    }
    else if (Array.isArray(exp) && exp[0] === 'super') {
        return OperationCode.SUPER_CALL;
    }
    else if (Array.isArray(exp) && exp[0] === 'module') {
        return OperationCode.MODULE_DEF;
    }
    else if (Array.isArray(exp) && exp[0] === 'import') {
        return OperationCode.MODULE_IMPORT;
    }
    else if (Array.isArray(exp)) {
        return OperationCode.FUNC_CALL;
    }

    return null;
}


function _evalBlock(expression, env) {
    const [_, ...expressions] = expression;
    let result;
    expressions.forEach(exp => {
        result = eval(exp, env);
    })
    return result;
}

function _evalBody(expression, env) {
    if (_getOperationCode(expression) === OperationCode.BEGIN_BLOCK) {
        return _evalBlock(expression, env)
    }
    return eval(expression, env);
}

function _callUserFunction(func, args) {
    const activationRecord = {}
    func.params.forEach((param, index) => {
        activationRecord[param] = args[index];
    })
    const activationEnv = new Environment(activationRecord, func.env,'<function>')
    return _evalBody(func.body, activationEnv);
}

function eval(expression, env = GLOBAL_ENV) {
    const opCode = _getOperationCode(expression)
    switch (opCode) {
        case null:
            throw `Not implemented: ${JSON.stringify(expression)}`;

        // -----------------------
        // JIT AST transformations
        case OperationCode.PLUS_EQUAL:
            return eval(astTransformer.plusEqualToSet(expression), env)
        case OperationCode.MINUS_EQUAL:
            return eval(astTransformer.minusEqualToSet(expression), env)
        case OperationCode.MULTIPLY_EQUAL:
            return eval(astTransformer.multiplyEqualToSet(expression), env)
        case OperationCode.DIVIDE_EQUAL:
            return eval(astTransformer.divideEqualToSet(expression), env)
        case OperationCode.INCREMENT:
            return eval(astTransformer.incrementToSet(expression), env);
        case OperationCode.DECREMENT:
            return eval(astTransformer.decrementToSet(expression), env);
        case OperationCode.SWITCH_STMT:
            return eval(astTransformer.switchToIf(expression), env);
        case OperationCode.FOR_STMT:
            return eval(astTransformer.forToWhile(expression), env);
        case OperationCode.FUNC_DEF: {
            return eval(astTransformer.funcDefToLambda(expression), env);
        }

        case OperationCode.NUMBER:
            return expression;
        case OperationCode.STRING:
            return expression.slice(1, -1);
        case OperationCode.BEGIN_BLOCK:
            const blockEnv = new Environment({}, env, '<block>')
            return _evalBlock(expression, blockEnv);
        case OperationCode.IF_STMT: {
            let [_, condition, subsequent, alternate] = expression;
            condition = eval(condition, env);
            if (condition) {
                return eval(subsequent, env);
            } else {
                return eval(alternate, env);
            }
        }
        case OperationCode.WHILE_STMT: {
            let [_, condition, body] = expression;
            let result;
            while (eval(condition, env)) {
                result = eval(body, env);
            }
            return result;
        }
        case OperationCode.DEF_VAR: {
            const [_, name, value] = expression;
            return env.define(name, eval(value, env));
        }
        case OperationCode.SET_VAR: {
            const [_, ref, value] = expression;
            if (_getOperationCode(ref) === OperationCode.PROP_ACCESS) {
                const [_, instance, property] = ref;
                const instanceEnv = eval(instance, env);
                return instanceEnv.define(property, eval(value, env))
            }
            return env.assign(ref, eval(value, env));
        }
        case OperationCode.GET_VAR:
            return env.lookup(expression);
        case OperationCode.LAMBDA_DEF: {
            const [_, params, body] = expression;
            return {body, params, env}
        }
        case OperationCode.CLASS_DEF: {
            const [_, name, parent, body] = expression;
            const parentEnv = eval(parent, env) || env;
            const classEnv = new Environment({}, parentEnv, `<class [${name}]>`);

            _evalBody(body, classEnv)
            return env.define(name, classEnv)
        }
        case OperationCode.NEW_INSTANCE: {
            const [_, className, ...params] = expression;

            const classEnv = eval(className, env);
            const instanceEnv = new Environment({}, classEnv, `<instance [${className}]>`);

            const args = params.map(param => eval(param, env));
            _callUserFunction(classEnv.lookup("init"), [instanceEnv, ...args])

            return instanceEnv;
        }
        case OperationCode.PROP_ACCESS: {
            const [_, instance, property] = expression;
            const instanceEnv = eval(instance, env);
            return instanceEnv.lookup(property);
        }
        case OperationCode.SUPER_CALL: {
            const [_, className] = expression;
            return eval(className, env).parent;
        }
        case OperationCode.MODULE_DEF: {
            const [_, moduleName, body] = expression;
            const moduleEnv = new Environment({}, env, `<module [${moduleName}]>`)
            _evalBody(body, moduleEnv)
            return env.define(moduleName, moduleEnv);
        }
        case OperationCode.MODULE_IMPORT: {
            const [_, moduleName] = expression;

            const moduleSrc = fs.readFileSync(`../modules/${moduleName}.rue`, 'utf-8')

            const body = Parser.parse(moduleSrc);
            return eval(['module', moduleName, body], env)
        }
        case OperationCode.FUNC_CALL: {
            const [funcName, ...params] = expression;

            const func = eval(funcName, env);
            const args = params.map(exp => eval(exp, env));

            // built-in functions
            if (typeof func === 'function') {
                return func(...args);
            }

            // user-defined functions
            return _callUserFunction(func, args);
        }
    }
}

module.exports = {
    eval,
}