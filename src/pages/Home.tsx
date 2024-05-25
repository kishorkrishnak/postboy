import {
  Add,
  ClearAll,
  ClearRounded,
  CloseSharp,
  ContentCopy,
} from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

const Home = () => {
  type Parameter = {
    key: string;
    value: string;
  };
  const [response, setResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("{\n\n}");
  const [method, setMethod] = useState<string>("get");
  const paramKeyRef = useRef<HTMLInputElement>(null);
  const paramValueRef = useRef<HTMLInputElement>(null);

  function addUrlParameters(url: string, param: Parameter) {
    if (!param.key || !param.value) {
      toast.error("Both key and value are required");
      return;
    }

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
    toast.success("Parameter added");
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
          py: 5,
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

          <Button
            onClick={() => {
              if (!isURL(url)) {
                toast.error("Invalid URL");
                return;
              }

              if (method === "get" || method === "delete") {
                axios({
                  method: method,
                  url: url,
                })
                  .then((res) => {
                    setResponse(JSON.stringify(res, null, 2));
                  })
                  .catch((err) => {
                    setResponse(JSON.stringify(err, null, 2));
                  });
              } else {
                let parsedData;
                try {
                  parsedData = JSON.parse(jsonInput);
                } catch (err) {
                  toast.error("Invalid JSON syntax");
                  return;
                }

                axios({
                  method: method,
                  url: url,
                  data: parsedData,
                })
                  .then((res) => {
                    setResponse(JSON.stringify(res, null, 2));
                  })
                  .catch((err) => {
                    setResponse(JSON.stringify(err, null, 2));
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
              row
              onChange={(e) => {
                setMethod(e.target.value);
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="get"
              name="radio-buttons-group"
            >
              <FormControlLabel value="get" control={<Radio />} label="GET" />
              <FormControlLabel value="post" control={<Radio />} label="POST" />
              <FormControlLabel value="put" control={<Radio />} label="PUT" />
              <FormControlLabel
                value="patch"
                control={<Radio />}
                label="PATCH"
              />
              <FormControlLabel
                value="delete"
                control={<Radio />}
                label="DELETE"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {url && isURL(url) && (
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
            <Typography variant="subtitle1">Add Query Params:</Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <TextField
                inputRef={paramKeyRef}
                size="small"
                id="request-url"
                fullWidth
                label="Key"
                variant="outlined"
              />
              <TextField
                inputRef={paramValueRef}
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
                    if (!paramKeyRef.current || !paramValueRef.current) {
                      toast.error("Both key and value required");
                      return;
                    }

                    const key: string = paramKeyRef.current.value;
                    const value: string = paramValueRef.current.value;

                    addUrlParameters(url, {
                      key,
                      value,
                    });

                    paramKeyRef.current.value = "";
                    paramValueRef.current.value = "";
                  }}
                >
                  <Add></Add>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
        {method !== "get" && method !== "delete" && (
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
                <Typography variant="subtitle1">Enter JSON Data:</Typography>
              </Box>

              <TextField
                onChange={(e) => {
                  setJsonInput(e.target.value);
                }}
                value={jsonInput}
                fullWidth
                multiline
                rows={3}
                sx={{
                  mt: 4,
                }}
              />
            </Box>
          </>
        )}

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
                <Box>
                 
                  <InputAdornment
                    onClick={() => {
                      navigator.clipboard.writeText(response);
                    }}
                    sx={{
                      position: "absolute",
                      top: 27,
                      right: 50,
                    }}
                    position="end"
                  >
                    <Tooltip title="Copy">
                      <IconButton edge="end">
                        <ContentCopy></ContentCopy>
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>


                  <InputAdornment
                    onClick={() => {
                      setResponse("");
                    }}
                    sx={{
                      position: "absolute",
                      top: 27,
                      right: 15,
                    }}
                    position="end"
                  >
                    <Tooltip title="Clear">
                      <IconButton edge="end">
                        <ClearRounded></ClearRounded>
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                </Box>
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
