import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { ThemeProvider as JssThemeProvider } from 'react-jss';

const theme = createMuiTheme();

class ThemeProvider extends React.PureComponent<any, any> {
	render() {
		return (
			<JssThemeProvider theme={{}} >
				<MuiThemeProvider theme={theme}>
					{this.props.children}
				</MuiThemeProvider>
			</JssThemeProvider>
		);
	}
}

export default ThemeProvider;
