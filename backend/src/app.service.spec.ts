import { hrtime } from 'node:process';

import { AppService, SYMBOLS } from './app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppService', () => {
    let appService: AppService;

    beforeEach(() => {
        appService = new AppService();
    });

    describe('generateMatrix()', () => {

        it('size 0 throws BadRequestException', () => {
            expect(() => appService.generateMatrix(0, Date.now())).toThrow(BadRequestException);
        });

        it('size 1 generates a single cell', () => {
            const matrix = appService.generateMatrix(1, Date.now());
            expect(matrix.length).toEqual(1);
            expect(matrix[0].length).toEqual(1);
        });
        it('generates square matrix using only allowed values', () => {
            const size = 50;
            const allowedValues = ['.', 1, 2, 3, 4, 5, 6, 7, 8, 9, ...SYMBOLS];

            const matrix = appService.generateMatrix(size, Date.now());

            expect(matrix.length).toEqual(size);
            matrix.forEach((row) => {
                expect(row.length).toEqual(size);
                row.forEach((cell) => {
                    expect(allowedValues.includes(cell)).toEqual(true);
                });
            });
        });

        it('time to generate matrix is not exponential with ensureDistance=false', () => {
            const testingSizes = [20, 200, 2000];
            const generationTimes = testingSizes.map((size) => {
                const start = hrtime.bigint();
                appService.generateMatrix(size, Date.now(), false);
                const end = hrtime.bigint();
                return Number((end - start) / BigInt(1000) / BigInt(size));
            });
            expect(generationTimes[1] / generationTimes[0]).toBeLessThan(100);
            expect(generationTimes[2] / generationTimes[1]).toBeLessThan(100);
        });

        it('time to generate matrix is not exponential with ensureDistance=true', () => {
            const testingSizes = [20, 200, 2000];
            const generationTimes = testingSizes.map((size) => {
                const start = hrtime.bigint();
                appService.generateMatrix(size, Date.now(), true);
                const end = hrtime.bigint();
                return Number((end - start) / BigInt(1000) / BigInt(size));
            });
            expect(generationTimes[1] / generationTimes[0]).toBeLessThan(100);
            expect(generationTimes[2] / generationTimes[1]).toBeLessThan(100);
        });

        it('generates expected approximate ratios of cell types with ensureDistance=false', () => {
            const size = 80;
            const matrix = appService.generateMatrix(size, Date.now(), false);
            const totalCount = size * size;

            let emptyCount = 0;
            let symbolCount = 0;
            let numberCount = 0;

            matrix.forEach((row) => {
                row.forEach((cell) => {
                    if (cell === '.') {
                        emptyCount++;
                    } else if (SYMBOLS.includes(cell as string)) {
                        symbolCount++;
                    } else if (typeof cell === 'number') {
                        numberCount++;
                    }
                });
            });

            const empty = emptyCount / totalCount;
            const symbol = symbolCount / totalCount;
            const number = numberCount / totalCount;

            // ---- 30%
            expect(empty).toBeGreaterThan(0.29);
            expect(empty).toBeLessThan(0.31);

            // ---- 7%
            expect(symbol).toBeGreaterThan(0.06);
            expect(symbol).toBeLessThan(0.08);

            // ---- 63%
            expect(number).toBeGreaterThan(0.62);
            expect(number).toBeLessThan(0.64);

            // TODO [LVL2]: If you decided to implement seeding, test that specific `seed` always generates the same matrix
            // TODO [LVL2]: If you decided to implement the ensureDistance functionality, test that it works correctly
        });

        describe('matrixToString()', () => {
            it('converts empty array into empty string', () => {
                const matrixString = appService.matrixToString([]);
                expect(matrixString).toEqual('');
            });

            it('array with single cell is converted into string with one character', () => {
                const matrixString = appService.matrixToString([[1]]);
                expect(matrixString).toEqual('1');
            });

            it('converts matrix into correct format', () => {
                const matrix = [
                    ['1', '.', '2'],
                    ['.', '&', '9'],
                    ['2', '.', '7'],
                ];
                const matrixString = appService.matrixToString(matrix);
                expect(matrixString).toEqual('1 . 2\n. & 9\n2 . 7');
            });
        });
    });
});
