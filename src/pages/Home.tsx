import Navbar from "../components/Navbar";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { ContentCopy, Add } from "@mui/icons-material";
import { toast } from "react-hot-toast";

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
  type Parameter = {
    key: string;
    value: string;
  };
  const [response, setResponse] = useState<string>("");

  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("get");
  const keyRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  function addUrlParameters(url: string, param: Parameter) {
    let newUrl = url;

    if (newUrl[newUrl.length - 1] === "/") {
      newUrl += "/";
    }

    if (newUrl.indexOf("?") === -1) {
      newUrl += `?${encodeURIComponent(param.key)}=${encodeURIComponent(
        param.value
      )}`;
    } else {
      const keyRegex = new RegExp(`${encodeURIComponent(param.key)}=\\S+&?`);
      const match = keyRegex.exec(newUrl);
      if (match) {
        newUrl = newUrl.replace(
          keyRegex,
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}&`
        );
      } else {
        const lastParamRegex = /&[^&]+$/;
        const lastMatch = lastParamRegex.exec(newUrl);
        if (lastMatch) {
          newUrl = newUrl.replace(
            lastParamRegex,
            `&${encodeURIComponent(param.key)}=${encodeURIComponent(
              param.value
            )}`
          );
        } else {
          newUrl += `&${encodeURIComponent(param.key)}=${encodeURIComponent(
            param.value
          )}`;
        }
      }
    }

    setUrl(newUrl);
  }

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
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "flex-start",
            gap: { xs: 1, md: 24 },

            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Typography variant="subtitle1">Enter URL:</Typography>
          <TextField
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            size="small"
            id="request-url"
            fullWidth
            label="Enter URL Here"
            variant="outlined"
            value={url}
          />
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },

            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: { md: 19 },
          }}
        >
          <Typography mt={0.5} variant="subtitle1">
            Request Type:
          </Typography>
          <FormControl>
            <RadioGroup
              onChange={(e) => {
                setMethod(e.target.value);
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
              justifyContent: "flex-start",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              gap: { xs: 1, md: 13 },
            }}
          >
            <Typography variant="subtitle1">Enter Query Params:</Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <TextField
                inputRef={keyRef}
                size="small"
                id="request-url"
                fullWidth
                label="Key"
                variant="outlined"
              />
              <TextField
                inputRef={valueRef}
                size="small"
                id="request-url"
                fullWidth
                label="Value"
                variant="outlined"
              />
              <Tooltip title="Add">
                <IconButton
                  edge="end"
                  onClick={() => {
                    if (!keyRef.current || !valueRef.current) {
                      toast.error("Both key and value required");
                      return;
                    }

                    const key: string = keyRef.current.value;
                    const value: string = valueRef.current.value;

                    addUrlParameters(url, {
                      key,
                      value,
                    });
                    toast.success("Parameter added");
                    keyRef.current.value = "";
                    valueRef.current.value = "";
                  }}
                >
                  <Add></Add>
                </IconButton>
              </Tooltip>
            </Box>
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
              axios
                .get(url)
                .then((res) => {
                  setResponse(JSON.stringify(res, null, 2));
                })
                .catch((err) => {
                  setResponse(err.message);
                });
            } else {
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
                WebkitTextFillColor:
                  response === "Invalid URL" ? "#fc4747" : "#ffffff",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Home;
