import styled from 'styled-components';

type ErrorMessageProps = {
    message: string;
};

const MessageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h4 {
        margin-bottom: 4px;
        color: ${(props) => props.theme.errorSecondColor};
        font-size: 10px;
        text-transform: uppercase;
    }

    h3 {
        padding: 16px 18px;
        background-color: ${(props) => props.theme.errorSecondColor};
        border-radius: 5px;
        border: 2px dotted ${(props) => props.theme.errorBorderColor};
        color: ${(props) => props.theme.errorPrimarColor};
        font-size: 15px;
    }

    span {
        padding-right: 5px;
    }
`;

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <MessageWrapper>
            <div>
                <h4>Error Message:</h4>
                <h3>
                    <span>⊗</span> {message}
                </h3>
            </div>
        </MessageWrapper>
    );
}
