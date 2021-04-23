import './App.css';
import RouterOutlet from 'components/common/RouterOutlet/View';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'components/common/ThemeProvider/View';
import React from 'react';
import AuthProvider from './components/common/AuthProvider/View';
import SnackbarProvider from './components/common/SnackbarProvider/View';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            <RouterOutlet />
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
