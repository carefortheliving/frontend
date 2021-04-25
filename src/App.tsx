import './App.css';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterOutlet from 'src/components/common/RouterOutlet/View';
import ThemeProvider from 'src/components/common/ThemeProvider/View';
import { AppProvider } from 'src/contexts/AppContext';

import AuthProvider from './components/common/AuthProvider/View';
import Footer from './components/common/Footer/View';
import Navbar from './components/common/Navbar/View';
import SnackbarProvider from './components/common/SnackbarProvider/View';

const App = () => (
	<AppProvider>
		<ThemeProvider>
			<BrowserRouter>
				<AuthProvider>
					<SnackbarProvider>
						<CssBaseline />
						<Navbar />
						<Box mt={10} minHeight="70vh">
							<RouterOutlet />
						</Box>
						<Footer />
					</SnackbarProvider>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	</AppProvider>
);

export default App;
