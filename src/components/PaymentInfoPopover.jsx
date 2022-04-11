import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Link, Popover, Typography, useTheme } from "@mui/material";

export const PaymentInfoPopover = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        size="small"
        sx={{ opacity: 1, color: theme.palette.primary.dark }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <InfoOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>
          View an example of a generated card{" "}
          <Typography
            component={Link}
            href="nano_11ba6sdcgrfx31ca5z5xhedbptcgyqj18169hw9ck65d6ps41imcrgxw7e6f"
          >
            here
          </Typography>
        </Typography>
      </Popover>
    </>
  );
};
