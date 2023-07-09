import * as React from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {ThemeType} from '../themes/ThemeType';

export default function useThemeCustom() {
  const theme = React.useContext<ThemeType>(ThemeContext);

  return theme;
}
