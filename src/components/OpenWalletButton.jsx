import React from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

export const OpenWalletButton = ({ address, amount }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("If nothing opened then your browser couldn't find a XNO wallet", {
      variant: "info",
    });
  };

  return (
    <a href={`nano:${address}${amount ? `?amount=${amount}` : ""}`}>
      <Button variant="contained" size="large" fullWidth onClick={handleClick}>
        Open in wallet
      </Button>
    </a>
  );
};
