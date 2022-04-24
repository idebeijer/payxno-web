import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/views/Home";
import { GlobalStyles, ThemeProvider, useMediaQuery, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PaymentPage } from "@/views/PaymentPage";
import { theme } from "@/theme";
import { Head } from "./Head";
import { InvalidPayment } from "@views/InvalidPayment";

function App() {
  const standaloneMediaQuery = useMediaQuery("(display-mode: standalone)");

  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        {standaloneMediaQuery ? <Box sx={{ height: 50 }}></Box> : <></>}
        <SnackbarProvider
          maxSnack={standaloneMediaQuery ? 1 : 3}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          sx={{ mt: standaloneMediaQuery ? 5 : 0 }}
        >
          <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.body } }} />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path=":address" element={<PaymentPage />} />
              <Route path="invalid" element={<InvalidPayment />} />
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
