import { type FC } from 'react';
import styled from 'styled-components';

import { type Neighborhood, symbolToIcon } from '../lib/matrix';

type NeighborhoodButtonProps = Neighborhood & {
    onSelect: (rowIndex: number, colIndex: number) => void;
    $isActive?: boolean;
};

const NeighborhoodButtonWrapper = styled.button<{ $isActive?: boolean }>`
    cursor: pointer;
    font-size: 8px;
    color: ${(props) => props.theme.secondColor};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.primarColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    gap: 4px;
    border-radius: 2px;
    padding: 2px 4px;
    transition: 0.3s;

    svg {
        opacity: 0.4;
    }

    &:hover {
        background-color: ${(props) => props.theme.hoverColor};
    }

    ${(props) =>
        props.$isActive &&
        `
        background-color: ${props.theme.activeColor};
        color: ${props.theme.invertedColor};
        border: none;

        svg{
           opacity: 1;
        };
        
        svg path {
            fill: ${props.theme.invertedColor};
        }
        
        &:hover{
        background-color: ${props.theme.activeColor};
        }
    `}
`;

// TODO [LVL1]: Add value to the button as label next to the icon. The value is sum of numbers in it's neighborhood.
// TODO [LVL1]: When you click on the button, it should highlight the neighborhood in the matrix.
// TODO [LVL2]: When you click on the button, the highlighted area in the matrix should have highlighted borders.
export const NeighborhoodButton: FC<NeighborhoodButtonProps> = ({
    symbol,
    rowIndex,
    colIndex,
    value,
    onSelect,
    $isActive,
}) => {
    const Icon = symbolToIcon[symbol];
    return (
        <NeighborhoodButtonWrapper
            className="neighborhood"
            data-cy-nh-row-index={rowIndex}
            data-cy-nh-cell-index={colIndex}
            onClick={() => onSelect(rowIndex, colIndex)}
            $isActive={$isActive}
        >
            <Icon />
            <span>{value}</span>
        </NeighborhoodButtonWrapper>
    );
};
