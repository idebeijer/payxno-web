import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material";

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]).isRequired,
};

const darkModeEnabled = true;

export const theme = createTheme({
  palette: {
    mode: darkModeEnabled ? "dark" : "light",
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
    background: {
      body: darkModeEnabled ? "#121212" : "#fafafa",
    },
  },
  typography: {
    fontFamily: "Open Sans",
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
