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

import { AmountCard } from "./AmountCard";
import { NoAmountCard } from "./NoAmountCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export const ValidPayment = (props) => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
        <Grid container direction="column" sx={{ p: 2, pb: 2, mt: 5 }}>
          {props.amountIsSet ? (
            <AmountCard amount={props.amount} currency={props.currency} />
          ) : (
            <NoAmountCard />
          )}
        </Grid>
      </Paper>
    </Container>
  );
};
