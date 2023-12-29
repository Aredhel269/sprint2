// Definim un tipus per a la funció de retorn (callback)
type Callback<T extends any[]> = (...args: T) => void;


// Definim la funció throttle amb tipus generics
export const throttle = <F extends (...args: any[]) => void>(
    callback: F,
    timeFrame: number
) => {
    // Variable per emmagatzemar l'últim temps en què es crida la funció
    // iniciatlitzem a null pq no hi ha cap temps anterior
    let lastTime: number | null = null;

    // Retorna una nova funció que limita la freqüència de crides a la funció original
    return (...args: Parameters<F>) => {
        // Obtenim el temps actual amb el mètode getTime
        const now = new Date().getTime();

        console.debug(`Crida a throttle`);

        // Comprovem si ha passat prou temps des de l'última crida 
        // o si és la primera crida
        if (!lastTime || now - lastTime >= timeFrame) {
            console.debug("Executant la funnció...");

            // Executem la funció original amb els paràmetres proporcionats
            callback(...args);
            // Actualitzem l'últim temps de crida
            lastTime = now;
        } else {
            console.debug("Ignorant la crida, no ha passat prou temps.");
            // Si no ha passat prou temps, no fem res (ignorem la crida)

        }
    };
};

/* Exemple d'ús
const funcioOriginal = (message: string) => {
    console.log(message);
};
 
// Nova funció amb throttle que permeti crides només cada 1000 mil·lisegons (1 segon)
const funcioAmbThrottle = throttle(funcioOriginal, 1000);
 
// Provar la funció amb throttle
funcioAmbThrottle('Crida 1'); // Aquesta crida s'executarà
funcioAmbThrottle('Crida 2'); // Aquesta crida no es processarà immediatament perquè està dins de la finestra de temps d'espera (1000 ms)
// Després de 1000 ms, la segona crida es processarà
 
// Implementem la funció throttle
/*export const throttle = <F extends (...args: any[]) => void>(
    callback: F,
wait: number
) => {
let timer: ReturnType<typeof setTimeout> | null;

// Retornem una funció amb els mateixos paràmetres que la funció original
return (...args: Parameters<F>) => {
    // Si ja hi ha un temporitzador en marxa --> 
    // la funció està en espera de ser executada després d'una crida anterior, 
    // i en aquest cas, la nova crida es descarta.
    if (timer)
    // no es fa res, sortim
        return;
    // Establim un nou temporitzador amb la f callback i el temps d'espera
    timer = setTimeout(() => {
        callback(...args); // Executem f callback amb els paràmetres proporcionats
        timer = null; // Restablim el temporitzador a null després de l'execució
    }, wait);
};
};

// Exemple d'ús:
const funcioOriginal: Callback<[number]> = (x) => {
console.log(x);
};

const funcioAmbThrottle = throttle(funcioOriginal, 1000); // Limita la crida a funcioOriginal a un cop per segon

// Provem la funció amb throttle
funcioAmbThrottle(1); // Aquesta crida s'executarà
funcioAmbThrottle(2); // Aquesta crida no es processarà immediatament perquè està dins de la finestra de temps d'espera (1000 ms)
// Després de 1000 ms, el segon missatge es processarà

/*export function throttle<T extends any[]>(
callback: Callback<T>,
wait: number
): Callback<T> {

let lastCallTime: number = 0;
return (...args): void => {
    const currentTime: number = new Date().getTime();
    if (currentTime - lastCallTime >= wait) {
        callback(...args);
        lastCallTime = currentTime;
    }
};
}*/







/*
setInterval(callback[, delay[, ...args]])

callback <Funció> La funció a trucar quan 
transcorre el temporitzador.

wait <nombre> El nombre de mil·lisegons 
que cal esperar abans de trucar al 
callback. Per defecte: 1 .

...args <qualsevol> Arguments opcionals 
per passar quan es callbackcrida.

Retorna: <Timeout> per utilitzar-lo 
amb clearInterval()

Programa l'execució repetida de 
callbackcada delaymil·lisegon.
*/

/* Exemple d'ús
const funcioAmbThrottle = throttle(function () {
    console.log("Funció executada");
}, 1000); // Límit de 1000 mil·lisegons (1 segon)

Exemple d'ús de la funció amb "throttle"
funcioAmbThrottle(); // Aquesta crida s'executarà
setTimeout(funcioAmbThrottle, 500); // Aquesta crida es bloquejarà perquè no ha passat prou temps des de l'última crida
setTimeout(funcioAmbThrottle, 1500); // Aquesta crida s'executarà perquè ha passat prou temps des de l'última crida
*/