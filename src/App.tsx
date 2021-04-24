import "./App.css";
import RouterOutlet from "src/components/common/RouterOutlet/View";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "src/components/common/ThemeProvider/View";
import AuthProvider from "./components/common/AuthProvider/View";
import SnackbarProvider from "./components/common/SnackbarProvider/View";
import Navbar from "./components/common/Navbar/View";
import { AppProvider } from "src/contexts/AppContext";
import Footer from "./components/common/Footer/View";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

const App = () => (
  <AppProvider>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider>
            <CssBaseline />
            <Navbar />
            <Box mt={10}>
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
