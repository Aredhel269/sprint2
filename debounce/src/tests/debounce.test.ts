import { expect, jest, test } from '@jest/globals';
import chalk from 'chalk';
import { debounce } from '../debounce';

jest.useFakeTimers();

describe('debounce', () => {
  test('Should debounce a function', async () => {
    // Inicialitzem 'callCount' per seguir quantes vegades es crida 'debounced'
    let callCount = 0;
    // Creem la funció 'debounced' utilitzant la funció 'debounce'
    const debounced = debounce((value) => {
      ++callCount;
    }, 32);
    // Efectuem tres crides seguides a 'debounced'
    debounced(console.log('Call a'));
    debounced(console.log('Call b'));
    debounced(console.log('Call c'));

    // Esperem que el comptador no s'hagi inicialitzat
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(128);
    console.log("Advance 128ms")
    // Després de l'espera comprovem que 'callCount' ha augmentat a 1
    expect(callCount).toBe(1);

    debounced(console.log('Call d'));
    debounced(console.log('Call e'));
    debounced(console.log('Call f'));

    // Esperem que el comptador no hagi aumgentat gràcies a l'espera
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(256);
    console.log("Advance 256ms")

    // comprovem que el comptador ha augmentat
    expect(callCount).toBe(2);
  });
});
