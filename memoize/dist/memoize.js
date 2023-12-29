"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCache = exports.memoize = void 0;
let cache = {};
const memoize = (func) => {
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache[key]) {
            cache[key] = func(...args);
        }
        return cache[key];
    };
};
exports.memoize = memoize;
const clearCache = () => {
    cache = {};
};
exports.clearCache = clearCache;
//# sourceMappingURL=memoize.js.map