import * as React from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';
import { useTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

// ref: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
type Color = React.CSSProperties['color'];
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: {
      zeroth: Color,
      first: Color,
      second: Color,
      third: Color,
      fourth: Color,
      fifth: Color,
    }
  }
  interface ThemeOptions extends Theme {
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3b5998',
    },
    secondary: {
      main: '#8b9dc3',
    },
  },
  // ref palette: https://www.color-hex.com/color-palette/185
  colors: {
    zeroth: 'black',
    first: '#3b5998',
    second: '#8b9dc3',
    third: '#dfe3ee',
    fourth: '#f7f7f7',
    fifth: '#ffffff',
  },
});

const ThemeProvider = (props) => {
  // const theme = useTheme();

  return (
    <JssThemeProvider theme={{}} >
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </JssThemeProvider>
  );
};

export default ThemeProvider;
