import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },

  typography: {
    allVariants: {
      color: "white",
    },
    fontFamily: "Arial,Helvetica,sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </ThemeProvider>
  );
};

export default App;
