import { AppBar, Box, Container, Grid, IconButton, useMediaQuery } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        sx={{ height: 50 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <IconButton sx={{ p: 0 }}>
            <MenuIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};
