import { type FC } from 'react';
import styled from 'styled-components';

import type { Neighborhood } from '../lib/matrix';
import { NeighborhoodButton } from './neighborhood_button';

const NeighborhoodsSectionWrapper = styled.section`
    margin-left: 20px;

    header {
        margin-top: 10px;
        margin-bottom: 17px;
    }

    .neighborhoods-list {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 2px;
    }
`;

type NeighborhoodsSectionProps = {
    neighborhoods: Neighborhood[];
    onSelect: (rowIndex: number, colIndex: number) => void;
    activeNeighborhood: { rowIndex: number; colIndex: number } | null;
};

export const NeighborhoodsSection: FC<NeighborhoodsSectionProps> = ({
    neighborhoods,
    onSelect,
    activeNeighborhood,
}) => {
    return (
        <NeighborhoodsSectionWrapper>
            <header>
                <h2>Neighborhoods</h2>
            </header>
            <div className="neighborhoods-list">
                {neighborhoods.map((neighborhood) => (
                    <NeighborhoodButton
                        key={neighborhood.id}
                        {...neighborhood}
                        onSelect={onSelect}
                        $isActive={
                            activeNeighborhood?.rowIndex === neighborhood.rowIndex &&
                            activeNeighborhood?.colIndex === neighborhood.colIndex
                        }
                    />
                ))}
            </div>
        </NeighborhoodsSectionWrapper>
    );
};
