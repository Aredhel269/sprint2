import { memoize } from '../memoize';

// Mock de la funció original per a propòsits de prova
const originalFunction = jest.fn((...args: any[]) => args.reduce((acc, val) => acc + val, 0));

describe('memoize', () => {
    it('Memoizes function calls', () => {
        // Versió memoitzada de la funció original
        const memoizedFunction = memoize(originalFunction);

        // Primera crida amb arguments 1, 2, 3
        const result1 = memoizedFunction(1, 2, 3);
        expect(result1).toBe(6);

        // Segona crida amb els mateixos arguments, hauria de fer servir el resultat memoitzat
        const result2 = memoizedFunction(1, 2, 3);
        expect(result2).toBe(6);

        // La funció original només es crida una vegada a causa de la memoització
        expect(originalFunction).toHaveBeenCalledTimes(1);
    });

    it('Handles different sets of arguments', () => {
        // Versió memoitzada de la funció original
        const memoizedFunction = memoize(originalFunction);

        // Primera crida amb arguments 1, 2, 3
        const result1 = memoizedFunction(1, 2, 3);
        expect(result1).toBe(6);

        // Nous arguments, s'ha de cridar la funció original de nou
        const result2 = memoizedFunction(4, 5, 6);
        expect(result2).toBe(15);

        // La funció original s'ha de cridar dues vegades ara
        expect(originalFunction).toHaveBeenCalledTimes(2);
    });
});