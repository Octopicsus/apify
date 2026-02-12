import { type FC } from 'react';
import styled from 'styled-components';

import type { Matrix } from '../lib/matrix';
import { SYMBOLS } from '../lib/matrix';
import { CellContent } from './cell_content';
import { PerformanceIndicator } from './performance_indicator';
import { TypeFilterButton } from './type_filter_button';

const MatrixSectionWrapper = styled.section`
    header {
        padding: 8px 0;
        display: flex;
        max-width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

    table {
        border-collapse: separate;
        border-spacing: 0px;
    }

    td {
        width: ${(props) => props.theme.sizeCell};
        height: ${(props) => props.theme.sizeCell};
        text-align: center;
        vertical-align: middle;
        font-size: 8px;
        padding: 1px;
        text-align: center;
        vertical-align: middle;
        color: ${(props) => props.theme.secondColor};
        border: 1px solid transparent;
        transition: 0.3s;
    }

    td[data-cy-is-in-active-neighborhood='true'] {
        background-color: ${(props) => props.theme.activeColor};
        color: ${(props) => props.theme.invertedColor};
        border: 1px solid ${(props) => props.theme.separatorColor};

        svg path {
            fill: ${(props) => props.theme.invertedColor};
        }
    }

    td[data-edge-top='true'] {
        border-top: 1px solid ${(props) => props.theme.invertedColor};
    }
    td[data-edge-bottom='true'] {
        border-bottom: 1px solid ${(props) => props.theme.invertedColor};
    }
    td[data-edge-left='true'] {
        border-left: 1px solid ${(props) => props.theme.invertedColor};
    }
    td[data-edge-right='true'] {
        border-right: 1px solid ${(props) => props.theme.invertedColor};
    }

    .type-filter {
        display: flex;
        gap: 5px;
    }

    .type-filter button {
        background-color: ${(props) => props.theme.primarColor};
        border: 1px solid ${(props) => props.theme.borderColor};
        padding: 0 10px;
        cursor: not-allowed;
        border-radius: 2px;

        &:hover {
            background-color: ${(props) => props.theme.hoverColor};
        }
    }
`;

type MatrixProps = {
    matrix: Matrix | undefined;
    activeNeighborhood: { rowIndex: number; colIndex: number } | null;
};

export const MatrixSection: FC<MatrixProps> = ({ matrix, activeNeighborhood }) => {
    const isActiveSymbol = (i: number, j: number): boolean => {
        return activeNeighborhood?.rowIndex === i && activeNeighborhood?.colIndex === j;
    };

    const isInActiveNeighborhood = (i: number, j: number): boolean => {
        if (!matrix || i < 0 || j < 0 || i >= matrix.length || j >= matrix[0]?.length) {
            return false;
        }

        return activeNeighborhood
            ? Math.abs(i - activeNeighborhood.rowIndex) <= 1 && Math.abs(j - activeNeighborhood.colIndex) <= 1
            : false;
    };

    const getEdgeFlags = (i: number, j: number) => {
        const getDefaultEdgeFlags = () => ({
            isInNeighborhood: false,
            isEdgeTop: false,
            isEdgeBottom: false,
            isEdgeLeft: false,
            isEdgeRight: false,
        });

        if (!activeNeighborhood) {
            return getDefaultEdgeFlags();
        }

        const isInNeighborhood = isInActiveNeighborhood(i, j);
        if (!isInNeighborhood) {
            return getDefaultEdgeFlags();
        }

        const isEdgeTop = !isInActiveNeighborhood(i - 1, j);
        const isEdgeBottom = !isInActiveNeighborhood(i + 1, j);
        const isEdgeLeft = !isInActiveNeighborhood(i, j - 1);
        const isEdgeRight = !isInActiveNeighborhood(i, j + 1);

        return {
            isInNeighborhood,
            isEdgeTop,
            isEdgeBottom,
            isEdgeLeft,
            isEdgeRight,
        };
    };

    if (!matrix) return <div />;

    return (
        <MatrixSectionWrapper>
            <header>
                <h1>Apify FS Developer Interview Task</h1>
                <div className="type-filter">
                    {SYMBOLS.map((symbol) => (
                        <TypeFilterButton key={`symbol-${symbol}`} symbol={symbol} />
                    ))}
                </div>
                <PerformanceIndicator />
            </header>
            <table className="matrix">
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={`matrix-row-${i}`}>
                            {row.map((cell, j) => {
                                const id = `${i}-${j}`;
                                const { isEdgeTop, isEdgeBottom, isEdgeLeft, isEdgeRight } = getEdgeFlags(i, j);

                                return (
                                    <td
                                        key={`matrix-cell-${id}`}
                                        data-cy-mx-row-index={i}
                                        data-cy-mx-cell-index={j}
                                        data-cy-is-active-symbol={isActiveSymbol(i, j)}
                                        data-cy-is-in-active-neighborhood={isInActiveNeighborhood(i, j)}
                                        data-edge-top={isEdgeTop}
                                        data-edge-bottom={isEdgeBottom}
                                        data-edge-left={isEdgeLeft}
                                        data-edge-right={isEdgeRight}
                                    >
                                        <CellContent key={`cell-${id}`} content={cell} />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </MatrixSectionWrapper>
    );
};
