import {ThemeProvider, createTheme} from '@rneui/themed';
import {ReactElement} from 'react';

const theme = createTheme({
  lightColors: {
    white: '#fff',
    black: '#131313',
    grey0: '#F4F5F4',
    grey1: '#DEDEDE',
    grey2: '#D0D1D0',
    grey3: '#9B9B9B',
    grey4: '#696969',
    primary: '#87B71F',
    success: '#75C537',
    error: '#C2534C',
  },
  darkColors: {
    white: '#131313',
    black: '#fff',
    grey0: '#1b1b1b',
    grey1: '#303030',
    grey2: '#696969',
    grey3: '#9B9B9B',
    grey4: '#DEDEDE',
    primary: '#B8DE64',
    success: '#7AA818',
    error: '#C2534C',
  },
});

export const ThemeCustomProvider = ({children}: {children: ReactElement}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
