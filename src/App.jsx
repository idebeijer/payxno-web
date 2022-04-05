import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/views/Home";
import { GlobalStyles, ThemeProvider, Paper, useMediaQuery, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { PaymentPage } from "@/views/PaymentPage";
import { Navbar } from "@components/Navbar/Navbar";
import { theme } from "@/theme";

function App() {
  const standaloneMediaQuery = useMediaQuery("(display-mode: standalone)");

  return (
    <ThemeProvider theme={theme}>
      {standaloneMediaQuery ? <Box sx={{ height: 50 }}></Box> : <></>}
      <SnackbarProvider>
        <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.body } }} />
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route exact path=":address" element={<PaymentPage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
