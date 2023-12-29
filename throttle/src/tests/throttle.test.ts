import { expect, jest, test } from '@jest/globals';
import { throttle } from '../throttle';

// Habilita la simulació del temps per a les proves
jest.useFakeTimers();

describe("throttle", () => {
    it('Should throttle a function', async () => {
        // Inicialitzem un comptador de crides
        let callCount = 0;
    
        // Creem una funció que s'executarà amb throttle
        const throttled = throttle((value) => {
            callCount++;
        }, 32);
    
        // Primera crida
        throttled(console.log('First call'));
    
        // Segona crida
        throttled(console.log('Second call'));
    
        // Tercera crida
        throttled(console.log('Third call'));
    
        // Emmagatzemem el valor actual del comptador
        const lastCount = callCount;
    
        // Espera 64 milisegons, el doble de l'interval especificat (32 milisegons)
        setTimeout(() => {
            // Comprovem que s'ha produït almenys una crida addicional durant l'espera
            expect(callCount > lastCount);
        }, 64);
    
        console.log("-----------End of the first test-----------");
    });
    
    it("Should not execute more than once in a smaller interval", () => {
        // Creem una funció fictícia
        const mockCallback = jest.fn();
        const throttled = throttle(mockCallback, 1000);

        // Primera crida
        throttled(console.log('First call'));

        // Intent de crida immediata (hauria de ser ignorada)
        throttled(console.log('Second call'));

        // Comprovació que la funció ha estat cridada només una vegada
        expect(mockCallback).toHaveBeenCalledTimes(1);
        console.log("-----------End of the second test-----------");
    });

    it("Should only execute after the specified interval", () => {
        const mockCallback = jest.fn();
        const throttled = throttle(mockCallback, 1000);

        // Primera crida (hauria de ser escoltada)
        throttled(console.log('First call'));

        // Avanç manualment el temps en 1000 milisegons
        jest.advanceTimersByTime(1000);
        console.log("Advance 1000ms");

        // Segona crida (hauria de ser escoltada)
        throttled(console.log('Second call'));

        // Tercera crida (hauria de ser ignorada)
        throttled(console.log('Third call'));

        // Avanç manualment el temps en 500 milisegons
        jest.advanceTimersByTime(500);
        console.log("Advance 500ms");

        // Quarta crida (hauria de ser ignorada)
        throttled(console.log('Fourth call'));

        // Comprovació que la funció ha estat cridada 2 vegades
        expect(mockCallback).toHaveBeenCalledTimes(2);

        // Avanç manualment el temps en 1500 milisegons
        jest.advanceTimersByTime(1500);
        console.log("Advance 1500m/s");

        // Cinquena crida (hauria de ser escoltada)
        throttled(console.log('Fifth call'));

        // Comprovació que la funció ha estat cridada 3 vegades
        expect(mockCallback).toHaveBeenCalledTimes(3);
        console.log("-----------End of the third test-----------");
    });
});