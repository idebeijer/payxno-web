import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Snackbar,
  Alert,
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
        <Paper>
          <Grid container spacing={2} direction="column" sx={{ padding: 2 }}>
            <Grid item>
              <h1>Home</h1>
            </Grid>
            <Grid item>
              <TextField
                id=""
                variant="outlined"
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
                  rows={4}
                  onChange={(e) => setValues({ ...values, address: e.target.value })}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
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
