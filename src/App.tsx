import "./App.css";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },

  typography: {
    allVariants: {
      color: "white",
    },
    fontFamily: "'Inter', sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
          </Routes>
        </>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
