import { expect, jest, test } from '@jest/globals';
import chalk from 'chalk';
import { debounce } from '../debounce';

jest.useFakeTimers();

describe('debounce', () => {
  test('Should debounce a function', async () => {
    // Inicialitzem 'callCount' per seguir quantes vegades es crida la funció 'debounced'
    let callCount = 0;
    // Creem la funció 'debounced' utilitzant la funció 'debounce'
    // 'debounced' rep un valor com a argument
    const debounced = debounce((value) => {
      // incrementem 'callCount'
      ++callCount;
      // retornem el mateix valor <-- esborrat
      // return value; <-- esborrat
    }, 32);
    // Efectuem tres crides successives a 'debounced'
    debounced(console.log('Call a'));
    debounced(console.log('Call b'));
    debounced(console.log('Call c'));

    // esborrat -->Com que les crides no tenen cap valor de retorn especificat -> esperem 'results' 'undefined'
    //expect(results).toEqual([undefined, undefined, undefined]); <-- 
    // Esperem que el comptador no s'hagi inicialitzat
    expect(callCount).toBe(0);
    // 'advanceTimersByTime' avança el rellotge intern de Jest en una quantitat de temps específica
    jest.advanceTimersByTime(128);
    console.log("Advance 128ms")
    // Després de l'espera comprovem que 'callCount' ha augmentat a 1
    expect(callCount).toBe(1);
  //Efectuem noves crides a 'debounced'
    debounced(console.log('Call d'));
    debounced(console.log('Call e'));
    debounced(console.log('Call f'));

    // --> esborrat Esperem que els resultats siguin 'c' (retorna el mateix valor fins que passa el temps de retard)
    // expect(results).toEqual(['c', 'c', 'c']); <--
    // Esperem que el comptador no hagi aumgentat gràcies a l'espera
    expect(callCount).toBe(1);
    // 'advanceTimersByTime' avança el rellotge intern de Jest en una quantitat de temps específica
    jest.advanceTimersByTime(256);
    console.log("Advance 256ms")

    // comprovem que el comptador ha augmentat
    expect(callCount).toBe(2);
  });
});
