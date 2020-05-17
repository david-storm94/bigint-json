let cloneDeep = require('lodash.clonedeep');

function stringify(input) {
    if (!input) {
        throw new Error('Invalid input')
    }

    if (typeof input !== "object") {
        throw new Error('TypeError: Do not know to stringify a ' + typeof input);
    }

    let object = cloneDeep(input);

    object = bigintToString(object);

    return JSON.stringify(object);
}


function bigintToString(o) {
    Object.keys(o).forEach(k => {
        if (typeof o[k] === 'object') {
            return bigintToString(o[k]);
        }
        if (typeof o[k] === "bigint") {
            o[k] = `${o[k]}n`
        }
    });
    return o;
}

module.exports = stringify;
