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
