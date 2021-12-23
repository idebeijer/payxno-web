import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../../utils/getNanoPrice";
import { megaToRaw, rawToMega } from "nano-unit-converter";
import { getSendURI } from "nano-uri-generator";
import QRCode from "qrcode";

import AmountCard from "./AmountCard";
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
      width: 1000,
      margin: 0,
      color: {
        light: "#f0f0f0",
      },
    }).then((url) => {
      setQrcodeSrc(url);
    });
  }, []);

  return (
    <Container maxWidth="xs">
      <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
        <Grid container direction="column" sx={{ p: 2, pb: 2, mt: 5 }}>
          {true ? <AmountCard /> : "test"}
        </Grid>
      </Paper>
    </Container>
  );
};
