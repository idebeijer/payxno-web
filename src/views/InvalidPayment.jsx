import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const InvalidPayment = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xs">
      <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
        <Grid container direction="column" sx={{ p: 2, pb: 2, mt: 5 }}>
          <Grid item sx={{ textAlign: "center", pb: 4 }}>
            The link used for this payment card seems to be invalid. Click the button below to
            create a new one.
          </Grid>
          <Grid item>
            <Button size="large" fullWidth variant="contained" onClick={() => navigate("/")}>
              Generate new payment card
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
