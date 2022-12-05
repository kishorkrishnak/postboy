import "./App.css";
import "@fontsource/roboto/500.css";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

const App = () => {
  const [response, setResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("get");

  const isURL = (url: string) => {
    const pattern = new RegExp(
      /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
    );
    return pattern.test(url);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Navbar></Navbar>

        <Box
          sx={{
            px: { xs: 1, md: 10 },
            pt: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              alignSelf: "flex-start",
              typography: { xs: "h5", md: "h4" },
            }}
            gutterBottom
          >
            Welcome To Postboy
          </Typography>

          <Typography
            sx={{
              alignSelf: "flex-start",
            }}
            variant="subtitle1"
            gutterBottom
          >
            Simple utility to send HTTP requests
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Enter URL:</Typography>
            <TextField
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              sx={{
                width: 900,
              }}
              size="small"
              id="request-url"
              fullWidth
              label="Enter URL Here"
              variant="outlined"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 19,
            }}
          >
            <Typography variant="subtitle1">Request Type</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="get"
                name="radio-buttons-group"
              >
                <FormControlLabel value="get" control={<Radio />} label="GET" />
                <FormControlLabel
                  value="post"
                  control={<Radio />}
                  label="POST"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 19,
            }}
          >
            <Typography variant="subtitle1">Content Type</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="json"
                  control={<Radio />}
                  label="JSON"
                />
                <FormControlLabel
                  value="custom"
                  control={<Radio />}
                  label="Custom Value"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="subtitle1">Enter JSON Data:</Typography>

            <TextField fullWidth multiline rows={3} />

            <Button
              onClick={() => {
                console.log(isURL(url));

                if (!isURL(url)) {
                  setResponse("Invalid URL");

                  return;
                }

                axios
                  .get(url)
                  .then((res) => {
                    setResponse(JSON.stringify(res, null, 2));
                  })
                  .catch((err) => {
                    setResponse(err.message);
                  });
              }}
              sx={{
                mt: 1,
                backgroundColor: "#37474F",
                color: "white",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Box>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 22.5,
            }}
          >
            <Typography variant="subtitle1">Response</Typography>
            <TextField
              // disabled
              InputProps={{
                readOnly: true,
              }}
              value={response}
              fullWidth
              multiline
            />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
