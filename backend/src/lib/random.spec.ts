import { getRandomNumberGenerator } from './random.js';

describe('lib/random', () => {
    describe('getRandomNumberGenerator()', () => {
        it('returns two different generators for two different seeds', () => {
            const random1 = getRandomNumberGenerator(0);
            const random2 = getRandomNumberGenerator(1);
            expect(random1()).not.toEqual(random2());
        });
        it('random number generator does not generate always the same number', () => {
            const random = getRandomNumberGenerator(Date.now());
            expect(random()).not.toEqual(random());
        });
        it('two random number generates with same seed generate same sequence of psuedorandom numbers', () => {
            const now = Date.now();
            const random1 = getRandomNumberGenerator(now);
            const random2 = getRandomNumberGenerator(now);
            for (let i = 0; i < 10; i++) {
                expect(random1()).toEqual(random2());
            }
        });
    });
});
