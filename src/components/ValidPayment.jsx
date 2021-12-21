import { Box, Button, Container, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../utils/getNanoPrice";
import { megaToRaw, rawToMega } from "nano-unit-converter";
import { getSendURI } from "nano-uri-generator";
import QRCode from "qrcode.react";

export const ValidPayment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  let params = useParams();

  const calcPrice = (amount) => {
    const [nanoPrice, setNanoPrice] = React.useState("");
    getNanoPrice().then(function (response) {
      setNanoPrice(response.nano.eur);
    });

    return amount * nanoPrice;
  };

  const sendURI = getSendURI(params.address, megaToRaw(amount));

  return (
    <Container maxWidth="xs">
      <Paper>
        <Grid container spacing={2} direction="column" sx={{ padding: 2 }}>
          <Grid item>
            <h1>Home</h1>
          </Grid>
          <Grid item>
            <Grid item container direction="row" wrap="nowrap">
              <Grid item>
                <TextField
                  id=""
                  value={amount}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="start">EUR</InputAdornment>,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item alignSelf="center">
                <Box sx={{ px: 1 }}>~</Box>
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  value={calcPrice(amount)}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="start">XNO</InputAdornment>,
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                label="Address"
                multiline
                fullWidth
                rows={4}
                value={params.address}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Box>
              <React.Suspense fallback="loading...">
                <Box>
                  <QRCode value={sendURI} />
                </Box>
              </React.Suspense>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
