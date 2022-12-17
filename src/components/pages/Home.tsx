import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import { ContentCopy, Add } from "@mui/icons-material";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  IconButton,
  Button,
  FormControlLabel,
  Radio,
  Tooltip,
  RadioGroup,
  InputAdornment,
} from "@mui/material";

const Home = () => {
  interface Parameter {
    key: string;
    value: string;
  }
  const [response, setResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("get");
  const [params, setParams] = useState<Parameter | {}>({});
  const generateParamStringAndAppend = (
    url: string,
    params: Parameter
  ): string => {
    return "test";
  };

  const isURL = (url: string) => {
    const pattern: RegExp =
      /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i;

    return pattern.test(url);
  };

  return (
    <>
      <Navbar></Navbar>

      <Box
        sx={{
          px: { xs: 2, md: 10 },
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
            mt: 4,
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
              width: 1065,
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
            mt: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 19,
          }}
        >
          <Typography mt={0.5} variant="subtitle1">
            Request Type:
          </Typography>
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                setMethod(e.target.value);
                console.log(e);
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="get"
              name="radio-buttons-group"
            >
              <FormControlLabel value="get" control={<Radio />} label="GET" />
              <FormControlLabel value="post" control={<Radio />} label="POST" />
            </RadioGroup>
          </FormControl>
        </Box>

        {url && isURL(url) && method === "get" && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">Enter Query Params:</Typography>
            <TextField
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              sx={{
                width: "40%",
              }}
              size="small"
              id="request-url"
              fullWidth
              label="Param"
              variant="outlined"
            />
            <TextField
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              sx={{
                width: "40%",
              }}
              size="small"
              id="request-url"
              fullWidth
              label="Value"
              variant="outlined"
            />
            <Tooltip title="Copy">
              <IconButton edge="end">
                <Add></Add>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {method === "post" && (
          <>
            <Box
              sx={{
                mt: 4,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="subtitle1">Enter JSON Data:</Typography>

              <TextField fullWidth multiline rows={3} />
            </Box>
          </>
        )}

        <Button
          onClick={() => {
            if (!isURL(url)) {
              setResponse("Invalid URL");
              return;
            }

            if (method === "get") {
              console.log("sending get request");

              axios
                .get(url)
                .then((res) => {
                  setResponse(JSON.stringify(res, null, 2));
                })
                .catch((err) => {
                  setResponse(err.message);
                });
            } else {
              console.log("sending post request");

              axios
                .post(url, {
                  title: "foo",
                  body: "bar",
                  userId: 1,
                })
                .then((res) => {
                  setResponse(JSON.stringify(res, null, 2));
                })
                .catch((err) => {
                  setResponse(err.message);
                });
            }
          }}
          sx={{
            mt: 1,
            backgroundColor: "#37474F",
            color: "white",
            alignSelf: "flex-start",
          }}
          variant="contained"
        >
          Submit
        </Button>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1, md: 22.5 },
          }}
        >
          <Typography variant="subtitle1">Response:</Typography>
          <TextField
            InputProps={{
              endAdornment: response ? (
                <InputAdornment
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                  }}
                  sx={{
                    position: "absolute",
                    top: 27,
                    right: 15,
                  }}
                  position="end"
                >
                  <Tooltip title="Copy">
                    <IconButton edge="end">
                      <ContentCopy></ContentCopy>
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ) : null,
            }}
            disabled
            value={response || "response will display here..."}
            fullWidth
            multiline
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "white",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
