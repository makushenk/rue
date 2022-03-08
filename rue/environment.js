class Environment {
    constructor(records = {}, parent = null, name = null) {
        this.records = records;
        this.parent = parent;
        this.name = name || '<unnamed environment>'
    }

    define(name, value) {
        this.records[name] = value;
        return value;
    }
    assign(name, value) {
        this.resolve(name).records[name] = value;
        return value
    }
    lookup(name) {
        return this.resolve(name).records[name]
    }
    resolve(name) {
        if (isVarDefined(this.records, name)) {
            return this;
        }

        if (this.parent === null) {
            throw ReferenceError(`${name} is not defined`);
        }

        return this.parent.resolve(name);
    }
}

function isVarDefined(records, name) {
    return records.hasOwnProperty(name);
}

module.exports = Environment;
