// Definim un tipus genèric per a la funció de retorn (callback)
type Callback<T extends any[], R> = (...args: T) => R;

let cache: Record<string, any> = {};

// Implementem la funció memoize que pren una funció de retorn (callback) 
//i retorna una versió memoitzada de la mateixa
export const memoize = <T extends any[], R>(func: Callback<T, R>): Callback<T, R> => {
    return (...args: T): R => {
        
    // Creem una clau única basada en els arguments proporcionats
        const key = JSON.stringify(args);

        // Comprovem si ja hem calculat i emmagatzemat el resultat per aquests arguments
        if (!cache[key]) {
            // Si no ho hem fet, executem la funció original amb els arguments
            cache[key] = func(...args);
        }

        // Tornem el resultat emmagatzemat en memòria cau
        return cache[key];
    };
};
// Funció per reiniciar la memòria cau (eliminant les entrades)
export const clearCache = () => {
    cache = {};
};