import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        baseColor: string;
        secondColor: string;
        primarColor: string;
        hoverColor: string;
        borderColor: string;
        activeColor: string;
        invertedColor: string;
        separatorColor: string;

        errorPrimarColor: string;
        errorSecondColor: string;
        errorBorderColor: string;

        testColor: string;

        sizeCell: string;
    }
}
