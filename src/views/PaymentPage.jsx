import { Box, Button, Container, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../utils/getNanoPrice";
import isValid from "nano-address-validator";

import { ValidPayment } from "../components/ValidPayment";
import { InvalidPayment } from "../components/InvalidPayment";
// const [nanoPrice, setNanoPrice] = React.useState(null);
// getNanoPrice().then(function (response) {
//   // setNanoPrice(response);
//   console.log(response);
// });

export const PaymentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = searchParams.get("amount");

  const checkParams = () => {
    if (amount !== null && isValid(params.address)) {
      return true;
    } else {
      return false;
    }
  };

  let params = useParams();
  console.log(amount);
  return <>{checkParams() ? <ValidPayment /> : <InvalidPayment />}</>;
};
