"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const throttle = (callback, timeFrame) => {
    let lastTime = null;
    return (...args) => {
        const now = new Date().getTime();
        console.log(`Crida a throttle. Hora actual: ${now}, lastTime: ${lastTime}`);
        if (!lastTime || now - lastTime >= timeFrame) {
            console.log("Executant la funció original...");
            callback(...args);
            lastTime = now;
        }
        else {
            console.log("Ignorant la crida, no ha passat prou temps.");
        }
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map