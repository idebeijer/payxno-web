import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import isValid from "nano-address-validator";

export const Home = () => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    amount: "",
    address: "",
  });

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const handleSubmit = () => {
    if (isValid(values.address) && values.amount !== "") {
      navigate(`/${values.address}?amount=${values.amount}`);
    } else if (values.amount === "") {
      handleSnackbar("invalidAmount");
    } else {
      handleSnackbar("invalidAddress");
    }
  };

  const handleSnackbar = (e) => {
    switch (e) {
      case "invalidAddress":
        setSnackbarState({ ...snackbarState, open: true, message: "Invalid XNO address" });
        break;
      case "invalidAmount":
        setSnackbarState({ ...snackbarState, open: true, message: "Invalid amount entered" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ maxWidth: 300, margin: "0 auto" }}>
          <Grid container spacing={2} direction="column" sx={{ px: 2, pb: 2, mt: 5 }}>
            <Grid item textAlign="center">
              <Typography variant="h3">ӾNO</Typography>
            </Grid>
            <Grid item>
              <TextField
                sx={{ mb: 2 }}
                id=""
                variant="outlined"
                fullWidth
                type="tel"
                onChange={(e) => setValues({ ...values, amount: e.target.value })}
                InputProps={{
                  endAdornment: <InputAdornment position="start">EUR</InputAdornment>,
                }}
              />
              <Grid item>
                <TextField
                  label="Address"
                  multiline
                  fullWidth
                  rows={4}
                  onChange={(e) => setValues({ ...values, address: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                Generate
              </Button>
              <Snackbar
                open={snackbarState.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                  vertical: snackbarState.vertical,
                  horizontal: snackbarState.horizontal,
                }}
              >
                <Alert onClose={handleSnackbarClose} severity="error">
                  {snackbarState.message}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
