import { Box, Button, Container, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import React from "react";

export const InvalidPayment = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
        <Grid container direction="column" sx={{ p: 2, pb: 2, mt: 5 }}>
          <Grid item sx={{ textAlign: "center", pb: 4 }}>
            The link used for this payment card seems to be invalid. Click the button below to
            create a new one.
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewRoundedIcon />}
              onClick={() => navigate("/")}
            >
              Generate new
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
