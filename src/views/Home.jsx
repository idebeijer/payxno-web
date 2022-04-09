import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Select,
  useTheme,
  MenuItem,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import isValid from "nano-address-validator";
import { Box, styled } from "@mui/system";
import { useSnackbar } from "notistack";

export const Home = () => {
  const standaloneMediaQuery = useMediaQuery("(display-mode: standalone)");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [values, setValues] = React.useState({
    amount: "",
    address: "",
    currency: "EUR",
  });

  const handleSubmit = () => {
    if (isValid(values.address)) {
      if (values.amount > 0) {
        navigate(`/${values.address}?amount=${values.amount}&currency=${values.currency}`);
      } else {
        navigate(`/${values.address}`);
      }
    } else {
      enqueueSnackbar("Invalid Nano address", { variant: "error" });
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={2} sx={{ maxWidth: 375, margin: "0 auto" }}>
          <Grid container direction="column" sx={{ px: 2, pb: 2, mt: 5 }}>
            <Grid item textAlign="center">
              <Typography variant="h3" sx={{ my: 2 }}>
                ӾNO
              </Typography>
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
                    <Select
                      defaultValue="EUR"
                      size="small"
                      value={values.currency}
                      onChange={(e) => setValues({ ...values, currency: e.target.value })}
                    >
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
                </Grid>
                <Grid item>
                  <TextField
                    size="large"
                    placeholder="nano_"
                    multiline
                    fullWidth
                    required
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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
