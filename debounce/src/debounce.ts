// Defineixo tipus genèric, amb funció que accepta 
//qualsevol nº d'arguments i no retorna cap valor
type Callback<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(
    callback: Callback<T>,
    wait: number
): Callback<T> {
    // tipus 'NodeJS.Timeout (enlloc d'any)
    // assegurem que només es fa servir com 
    // a ID de temporitzador
    let timeoutId: NodeJS.Timeout;

    return (...args: T): void => {
        //s'elimina el temporitzador actual, si existeix
        clearTimeout(timeoutId)

        // s'estableix nou temporitzador
        timeoutId = setTimeout(() => {
            callback(...args);
        }, wait)
    }

}








