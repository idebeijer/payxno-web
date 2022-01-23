import { Box, Button, Container, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../utils/getNanoPrice";
import isValid from "nano-address-validator";

import { ValidPayment } from "../components/Validpayment/index";
import { InvalidPayment } from "../components/InvalidPayment";

export const PaymentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let params = useParams();
  const amount = searchParams.get("amount");
  var currency = null;

  if (searchParams.get(currency)) {
    currency = searchParams.get("currency").toUpperCase();
  }

  if (amount > 0 && ["EUR", "XNO", "USD"].indexOf(currency) >= 0 && isValid(params.address)) {
    console.log("1");
    return (
      <ValidPayment
        amountIsSet={true}
        currency={currency}
        amount={amount}
        address={params.address}
      />
    );
  } else if (isValid(params.address) && !currency && !amount) {
    console.log("2");
    return <ValidPayment amountIsSet={false} address={params.address} />;
  } else {
    return <InvalidPayment />;
  }
};
