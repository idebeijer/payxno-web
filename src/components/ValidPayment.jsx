import { Box, Button, Container, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../utils/getNanoPrice";
import { megaToRaw, rawToMega } from "nano-unit-converter";
import { getSendURI } from "nano-uri-generator";
import QRCode from "qrcode";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export const ValidPayment = () => {
  const navigate = useNavigate();

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

  const [qrcodeSrc, setQrcodeSrc] = React.useState("");

  React.useEffect(() => {
    QRCode.toDataURL(sendURI, {
      width: 600,
      margin: 0,
    }).then((url) => {
      setQrcodeSrc(url);
    });
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper sx={{ maxWidth: 300, margin: "0 auto" }}>
        <Grid container spacing={2} direction="column" sx={{ px: 2, pb: 2, mt: 5 }}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewRoundedIcon />}
              onClick={() => navigate("/")}
            >
              Generate new
            </Button>
          </Grid>
          <Grid item>
            <Grid item container direction="row" wrap="nowrap" sx={{ mb: 2 }}>
              <Grid item>
                <TextField
                  id=""
                  value={amount}
                  variant="outlined"
                  fullWidth
                  disabled
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
                  disabled
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
                disabled
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
                <Box padding={1} sx={{ backgroundColor: "white", borderRadius: 1 }}>
                  {/* <QRCode bgColor="white" fgColor="black" size="300" value={sendURI} /> */}
                  <img width="100%" src={qrcodeSrc}></img>
                </Box>
              </React.Suspense>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
