import { useState } from 'react';
import styled from 'styled-components';

import { ErrorMessage } from './components/error_message';
import { Loader } from './components/loader';
import { MatrixSection } from './components/matrix_section';
import { NeighborhoodsSection } from './components/neighborhoods_section';
import { useMatrix } from './hooks/use_matrix';
import { useTimer } from './hooks/use_timer';
import { matrixToNeighborhoods } from './lib/matrix';

const AppContainer = styled.div`
    color: ${(props) => props.theme.baseColor};
    padding: 5px;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    div {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    h1,
    h2 {
        font-weight: bold;
        font-size: 13px;
    }

    svg {
        scale: 0.9;
    }
`;

export const App = () => {
    useTimer(); // Do not remove this. If you reorganize your app, move it to the same level.
    const [activeNeighborhood, setActiveNeighborhood] = useState<{ rowIndex: number; colIndex: number } | null>(null);
    const { matrix, isPending, error } = useMatrix();
    const neighborhoods = matrix ? matrixToNeighborhoods(matrix) : [];

    const handleSelectNeighborhood = (rowIndex: number, colIndex: number) => {
        if (activeNeighborhood?.rowIndex === rowIndex && activeNeighborhood?.colIndex === colIndex) {
            setActiveNeighborhood(null);
        } else {
            setActiveNeighborhood({ rowIndex, colIndex });
        }
    };

    // TODO [LVL1]: Handle the error from useMatrix however you want

    const renderContent = () => {
        if (isPending) return <Loader />;
        if (error) return <ErrorMessage message={error.message} />;

        return (
            <div>
                <MatrixSection matrix={matrix} activeNeighborhood={activeNeighborhood} />
                <NeighborhoodsSection
                    neighborhoods={neighborhoods}
                    onSelect={handleSelectNeighborhood}
                    activeNeighborhood={activeNeighborhood}
                />
            </div>
        );
    };

    return <AppContainer>{renderContent()}</AppContainer>;
};
