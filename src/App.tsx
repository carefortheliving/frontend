import React from 'react';
import './App.css';
import RouterOutlet from 'src/components/common/RouterOutlet/View';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'src/components/common/ThemeProvider/View';
import AuthProvider from './components/common/AuthProvider/View';
import SnackbarProvider from './components/common/SnackbarProvider/View';
import Navbar from './components/common/Navbar/View';
import Footer from './components/common/Footer/View';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ScrollToTop from 'react-scroll-to-top';
import RecoilProvider from 'src/components/common/RecoilProvider/View';

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <RecoilProvider>
        <AuthProvider>
          <SnackbarProvider>
            <CssBaseline />
            <Navbar />
            <Box mt={10} minHeight="70vh">
              <ScrollToTop smooth />
              <RouterOutlet />
            </Box>
            <Footer />
          </SnackbarProvider>
        </AuthProvider>
      </RecoilProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
