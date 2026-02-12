import { BadRequestException, Injectable } from '@nestjs/common';

export const SYMBOLS = ['#', '@', '$', '%', '&', '*'];

export type Matrix = (number | string)[][];
export type Cell = (number | string)[];

@Injectable()
export class AppService {
    /*
        TODO [LVL1]: Generate a square matrix of provided size, see comments
        There should be 30% of cells in the matrix empty, these cells should have value `.` (dot)
        The remaining 70% of cells should be divided to either numbers 1-9 (90%) or symbols from the `SYMBOLS` array (10%)
        The matrix should then be returned as string where between cells are spaces ' ' and between rows are new lines '\n'
    */

    public generateMatrix(size: number, _seed?: number, _ensureDistance?: boolean): Matrix {
        const cells: Cell = [];

        const totalCount = size * size;
        const emptyCount = Math.round(totalCount * 0.3);
        const remainingCount = totalCount - emptyCount;
        const numberCount = Math.round(remainingCount * 0.9);
        const symbolCount = remainingCount - numberCount;

        if (size === 0) {
            throw new BadRequestException('Incorrect Matrix Size');
        }

        for (let i = 0; i < emptyCount; i++) {
            cells.push('.');
        }

        for (let i = 0; i < numberCount; i++) {
            const numberCells = Math.floor(Math.random() * 9) + 1;

            cells.push(numberCells);
        }

        for (let i = 0; i < symbolCount; i++) {
            const symbolCells = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

            cells.push(symbolCells);
        }

        for (let i = cells.length - 1; i > 0; i--) {
            const temp = cells[i];
            const randomIndex = Math.floor(Math.random() * (i + 1));

            cells[i] = cells[randomIndex];
            cells[randomIndex] = temp;
        }

        const matrix: Matrix = Array.from({ length: size }, (_, rowIndex) =>
            cells.slice(rowIndex * size, (rowIndex + 1) * size),
        );

        return matrix;
    }
    /*
        TODO [LVL2]: Use seedable random number generator to always generate the same matrix for same seed
    */
    /*
        TODO [LVL2]: Ensure that two neighborhoods in matrix never contains cells from another neighborhood
        This means that another symbol cannot appear anywhere
        where 1 or 2 is in this example.
        . . . . . . .
        . 2 2 2 2 2 .
        . 2 1 1 1 2 .
        . 2 1 $ 1 2 .
        . 2 1 1 1 2 .
        . 2 2 2 2 2 .
        . . . . . . .
    */
    // public generateMatrix(size: number, _seed?: number, _ensureDistance?: boolean): Matrix {
    //     const matrix: Matrix = Array.from<string[][], string[]>(
    //         { length: size },
    //         () => Array(size).fill('.') as string[],
    //     );
    //     return matrix;
    // }

    public matrixToString(matrix: Matrix): string {
        return matrix.map((row) => row.join(' ')).join('\n');
    }
}
