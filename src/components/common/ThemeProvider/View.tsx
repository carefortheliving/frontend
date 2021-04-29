import * as React from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import { useTheme, MuiThemeProvider } from '@material-ui/core';

const ThemeProvider = (props) => {
  const theme = useTheme();

  return (
    <JssThemeProvider theme={{}} >
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </JssThemeProvider>
  );
};

export default ThemeProvider;
