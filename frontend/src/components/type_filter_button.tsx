import { type FC } from 'react';
import styled from 'styled-components';

import { symbolToIcon } from '../lib/matrix';

const TypeFilterButtonWrapper = styled.button`
    cursor: not-allowed;
`;

type TypeFilterButtonProps = {
    symbol: string;
};

// TODO [LVL2]: When you click on a type filter button, the neighborhoods for that type are highlighted in the matrix
export const TypeFilterButton: FC<TypeFilterButtonProps> = ({ symbol }) => {
    const Icon = symbolToIcon[symbol];
    return (
        <TypeFilterButtonWrapper disabled>
            <Icon />
        </TypeFilterButtonWrapper>
    );
};
