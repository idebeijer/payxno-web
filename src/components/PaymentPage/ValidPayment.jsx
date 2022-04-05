import { Container, Grid, Paper } from "@mui/material";
import React from "react";

import { PaymentWithAmount } from "./PaymentWithAmount";
import { PaymentNoAmount } from "./PaymentNoAmount";

export const ValidPayment = (props) => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
        <Grid container direction="column" sx={{ p: 2, pb: 2, mt: 5 }}>
          {props.amountIsSet ? (
            <PaymentWithAmount amount={props.amount} currency={props.currency} />
          ) : (
            <PaymentNoAmount />
          )}
        </Grid>
      </Paper>
    </Container>
  );
};
