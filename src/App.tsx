import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
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
