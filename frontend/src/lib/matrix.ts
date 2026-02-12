import Airplane from '../assets/airplane.svg?react';
import Bicycle from '../assets/bicycle.svg?react';
import Boat from '../assets/boat.svg?react';
import Bus from '../assets/bus.svg?react';
import CarSport from '../assets/car.svg?react';
import Person from '../assets/person.svg?react';

export type Matrix = string[][];

export type Neighborhood = {
    id: string;
    rowIndex: number;
    colIndex: number;
    symbol: string;
    value: number;
};

export const SYMBOLS = ['#', '@', '$', '%', '&', '*'];

// You can use these components in your code like this:
// const Icon = symbolToIcon['#'];
// return <Icon />;
export const symbolToIcon = {
    [SYMBOLS[0]]: Person,
    [SYMBOLS[1]]: Airplane,
    [SYMBOLS[2]]: Bicycle,
    [SYMBOLS[3]]: Boat,
    [SYMBOLS[4]]: Bus,
    [SYMBOLS[5]]: CarSport,
};

/**
 * Parses the matrix string into 2D string array.
 *
 * @param matrixString Matrix represented as string as received from backend
 * @returns Matrix represented as 2D array of strings
 */
export function matrixStringToMatrix(matrixString: string): Matrix {
    return matrixString.split('\n').map((row) => row.split(' '));
}

/**
 * This utility function parses the matrix into a list of neighborhoods of symbols.
 * Neighborhood are the 8 cells around the symbol and the symbol itself.
 * The value of the neighborhood is the sum of the numbers in it.
 *
 * @param matrix The matrix in array representation
 * @returns List of all neighborhoods of symbols in the matrix
 */

// TODO [LVL1]: Calculate value of the neighborhood, which is a sum of all numbers neighboring the symbol

export function matrixToNeighborhoods(matrix: Matrix): Neighborhood[] {
    const neighborhoods: Neighborhood[] = [];
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    const isValidIndex = (row: number, col: number) =>
        row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;

    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix.length; c++) {
            if (!SYMBOLS.includes(matrix[r][c])) continue;
            const symbol = matrix[r][c];

            let neighborhoodValue = 0;
            for (const [dx, dy] of directions) {
                const neighborRow = r + dx;
                const neighborCol = c + dy;

                if (isValidIndex(neighborRow, neighborCol)) {
                    const neighbor = matrix[neighborRow][neighborCol];
                    if (!Number.isNaN(Number(neighbor))) {
                        neighborhoodValue += Number(neighbor);
                    }
                }
            }

            neighborhoods.push({
                id: `${r}-${c}`,
                rowIndex: r,
                colIndex: c,
                symbol,
                value: neighborhoodValue,
            });
        }
    }
    return neighborhoods;
}
