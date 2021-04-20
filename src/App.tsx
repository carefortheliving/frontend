import React from 'react';
import './App.css';
import RouterOutlet from 'src/components/common/RouterOutlet/View';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'src/components/common/ThemeProvider/View';
import RecoilProvider from 'src/components/common/RecoilProvider/View';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RecoilProvider>
          <RouterOutlet />
        </RecoilProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
