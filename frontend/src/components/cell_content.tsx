import { type FC } from 'react';

import { SYMBOLS, symbolToIcon } from '../lib/matrix';

type CellContentProps = {
    content: string | number;
};

export const CellContent: FC<CellContentProps> = ({ content }) => {
    let translatedContent: string | number | React.ReactNode = content;
    if (content === '.') translatedContent = ' ';
    if (typeof content === 'string' && SYMBOLS.includes(content)) {
        const Icon = symbolToIcon[content];
        translatedContent = <Icon />;
    }

    return <>{translatedContent}</>;
};
