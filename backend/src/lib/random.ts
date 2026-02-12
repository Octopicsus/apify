export type RandomNumberGeneratorFunc = () => number;
/**
 * This helper function takes provided seed number and returns a number generator which always returns the same random numbers based on the seed.
 * @param seed Seed to be used for the pseudo random number generator
 * @returns random number
 */
export const getRandomNumberGenerator = (seed: number): RandomNumberGeneratorFunc => {
    const mask = 0xffffffff;
    let mW = (123456789 + seed) & mask;
    let mZ = (987654321 - seed) & mask;

    return function () {
        mZ = (36969 * (mZ & 65535) + (mZ >>> 16)) & mask;
        mW = (18000 * (mW & 65535) + (mW >>> 16)) & mask;

        let result = ((mZ << 16) + (mW & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    };
};
