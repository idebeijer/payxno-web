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
  Select,
  useTheme,
  MenuItem,
  NativeSelect,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import isValid from "nano-address-validator";
import { Box, styled } from "@mui/system";

export const Home = () => {
  const standaloneMediaQuery = useMediaQuery("(display-mode: standalone)");
  const navigate = useNavigate();
  const theme = useTheme();

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

  // const MinimalSelect = styled(Select)(({ theme }) => ({
  //   border: "unset",
  // }));

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={1} sx={{ maxWidth: 375, margin: "0 auto" }}>
          <Grid container direction="column" sx={{ px: 2, pb: 2, mt: 5 }}>
            <Grid item textAlign="center">
              <Typography variant="h3">ӾNO</Typography>
            </Grid>
            <Grid item sx={{ pb: 2 }}>
              <Grid item>
                <Box display="flex" flexDirection="row" justifyContent="space-between" gap="1">
                  <TextField
                    sx={{ mb: 2, mr: 2 }}
                    id=""
                    variant="outlined"
                    size="small"
                    type="tel"
                    fullWidth
                    label="Amount (optional)"
                    onChange={(e) => setValues({ ...values, amount: e.target.value })}
                    InputProps={{
                      endAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  />
                  <Box>
                    <Select defaultValue="EUR" size="small">
                      <MenuItem value={"EUR"}>EUR</MenuItem>
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"XNO"}>XNO</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Grid>
              <Grid item sx={{ pb: 2 }}>
                <Divider variant="middle"></Divider>
              </Grid>
              <Grid item container direction="column">
                <Grid item container sx={{ pb: 1 }} direction="row" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Nano Address</Typography>
                  </Grid>
                  <Grid item>
                    <Button size="small">Paste</Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    // label="Address"
                    size="large"
                    placeholder="nano_"
                    multiline
                    fullWidth
                    required
                    // label="Nano address"
                    rows={4}
                    onChange={(e) => setValues({ ...values, address: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button size="large" fullWidth variant="contained" onClick={handleSubmit}>
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
                {standaloneMediaQuery ? (
                  <Alert
                    variant="filled"
                    sx={{ mt: 8 }}
                    onClose={handleSnackbarClose}
                    severity="error"
                  >
                    {snackbarState.message}
                  </Alert>
                ) : (
                  <Alert variant="filled" onClose={handleSnackbarClose} severity="error">
                    {snackbarState.message}
                  </Alert>
                )}
              </Snackbar>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
