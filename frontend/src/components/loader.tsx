import type { FC } from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader {
        border: 16px solid ${(props) => props.theme.primarColor};
        border-color: ${(props) => props.theme.secondColor} ${(props) => props.theme.testColor}
            ${(props) => props.theme.testColor} ${(props) => props.theme.testColor};
        animation: rotate 3s steps(4) infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    p {
        position: absolute;
        transform: rotate(90deg);
        margin-top: 150px;
        top: 0;
        left: 0;
        font-size: 40px;
        font-weight: 100;
        text-align: left;
        text-transform: uppercase;
        color: ${(props) => props.theme.borderColor};
    }
`;

export const Loader: FC = () => {
    return (
        <LoaderWrapper>
            <div>
                <span className="loader"></span>
                <p>Loading . . .</p>
            </div>
        </LoaderWrapper>
    );
};
