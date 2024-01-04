"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const throttle = (callback, timeFrame) => {
    let lastTime = null;
    return (...args) => {
        const now = new Date().getTime();
        console.debug(`Crida a throttle`);
        if (!lastTime || now - lastTime >= timeFrame) {
            console.debug("Executant la funnció...");
            callback(...args);
            lastTime = now;
        }
        else {
            console.debug("Ignorant la crida, no ha passat prou temps.");
        }
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map