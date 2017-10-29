module.exports = class Enum {
    constructor(keys, start = 0) {
        return keys.reduce((_enum, k) => (_enum[k] = start++, _enum), {});
    }
};
