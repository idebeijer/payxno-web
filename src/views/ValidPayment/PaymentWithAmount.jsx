import { Box, Button, Divider, Grid, InputAdornment, Skeleton, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNanoPrice } from "@services/currency.service";
import { megaToRaw } from "nano-unit-converter";
import { getSendURI } from "nano-uri-generator";
import QRCode from "qrcode";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { OpenWalletButton } from "@components/OpenWalletButton";

export const PaymentWithAmount = (props) => {
  const navigate = useNavigate();
  const [qrcodeSrc, setQrcodeSrc] = useState("");
  const [calcedAmount, setCalcedAmount] = useState("");
  const [rawNanoAmount, setRawNanoAmount] = useState("");
  const [nanoPrice, setNanoPrice] = useState("");
  let params = useParams();
  const amount = props.amount;
  const currency = props.currency;

  useEffect(() => {
    if (currency == "XNO") {
      setCalcedAmount(amount);
    } else {
      getNanoPrice(currency).then((response) => {
        setNanoPrice(response.nano[`${currency.toLowerCase()}`]);
      });
      setCalcedAmount((amount / nanoPrice).toFixed(5));
    }

    try {
      const xnoUri = getSendURI(params.address, megaToRaw(calcedAmount));
      setRawNanoAmount(megaToRaw(calcedAmount));
      QRCode.toDataURL(xnoUri, {
        width: 1000,
        margin: 0,
        color: {
          light: "#f0f0f0",
        },
      }).then((url) => {
        setQrcodeSrc(url);
      });
    } catch (e) {}
  });

  return (
    <>
      <Grid item sx={{ pb: 2 }}>
        <Box>
          {qrcodeSrc ? (
            <Box
              padding={2}
              sx={{ backgroundColor: "#f0f0f0", borderRadius: 1, margin: "0 auto" }}
              width="60%"
            >
              <img width="100%" src={qrcodeSrc}></img>
            </Box>
          ) : (
            <Box padding={2} width="60%" height="100%" sx={{ borderRadius: 1, margin: "0 auto" }}>
              <Skeleton variant="rectangular" width="100%" height={200}></Skeleton>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Divider variant="middle"></Divider>
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Grid item container direction="row" wrap="nowrap" sx={{ mb: 2 }}>
          <Grid item sx={{ width: "100%" }}>
            <TextField
              id=""
              value={amount}
              variant="outlined"
              fullWidth
              disabled
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="start">{props.currency}</InputAdornment>,
                readOnly: true,
              }}
            />
          </Grid>
          {currency == "XNO" ? (
            <></>
          ) : (
            <>
              <Grid item alignSelf="center">
                <Box sx={{ px: 1 }}>~</Box>
              </Grid>
              <Grid item>
                <TextField
                  id=""
                  disabled
                  size="small"
                  value={calcedAmount}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="start">XNO</InputAdornment>,
                    readOnly: true,
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid item>
          <TextField
            label="Nano Address"
            disabled
            multiline
            fullWidth
            size="small"
            rows={4}
            value={params.address}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <OpenWalletButton address={params.address} amount={rawNanoAmount} />
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Divider variant="middle"></Divider>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          startIcon={<ArrowBackIosNewRoundedIcon />}
          onClick={() => navigate("/")}
        >
          Generate new
        </Button>
      </Grid>
    </>
  );
};
