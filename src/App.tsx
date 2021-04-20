import React from 'react';
import './App.css';
import RouterOutlet from 'src/components/common/RouterOutlet/View';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'src/components/common/ThemeProvider/View';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RouterOutlet />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
