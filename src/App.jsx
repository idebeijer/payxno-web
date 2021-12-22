import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { createTheme, GlobalStyles, ThemeProvider, Paper, useMediaQuery, Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { PaymentPage } from "./views/PaymentPage";
import { Navbar } from "./components/Navbar/Navbar";

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]).isRequired,
};

function App() {
  const standaloneMediaQuery = useMediaQuery("(display-mode: standalone)");
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#0070c1",
        light: "#0085e3",
        dark: "#004e87",
      },
      secondary: {
        main: "#ff0000",
        light: "#ff3333",
        dark: "#b20000",
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {standaloneMediaQuery ? <Box sx={{ height: 50 }}></Box> : <></>}
      <SnackbarProvider>
        <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />
        <Paper elevation={0}>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route exact path=":address" element={<PaymentPage />} />
            </Route>
          </Routes>
        </Paper>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
