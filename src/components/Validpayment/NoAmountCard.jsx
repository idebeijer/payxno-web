import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getNanoPrice } from "../../utils/getNanoPrice";
import { megaToRaw, rawToMega } from "nano-unit-converter";
import { getSendURI } from "nano-uri-generator";
import QRCode from "qrcode";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export const NoAmountCard = (props) => {
  const navigate = useNavigate();

  let params = useParams();

  const sendURI = getSendURI(params.address);

  const [qrcodeSrc, setQrcodeSrc] = React.useState("");

  React.useEffect(() => {
    QRCode.toDataURL(sendURI, {
      width: 1000,
      margin: 0,
      color: {
        light: "#f0f0f0",
      },
    }).then((url) => {
      setQrcodeSrc(url);
    });
  }, []);

  return (
    <>
      <Grid item sx={{ pb: 2 }}>
        <Box>
          <React.Suspense fallback="loading...">
            <Box
              padding={2}
              sx={{ backgroundColor: "#f0f0f0", borderRadius: 1, margin: "0 auto" }}
              width="60%"
            >
              {/* <QRCode bgColor="white" fgColor="black" size="300" value={sendURI} /> */}
              <img width="100%" src={qrcodeSrc}></img>
            </Box>
          </React.Suspense>
        </Box>
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Divider variant="middle"></Divider>
      </Grid>
      <Grid item sx={{ pb: 2 }}>
        <Grid item>
          <TextField
            label="Nano Address"
            disabled
            multiline
            fullWidth
            size="small"
            rows={4}
            value={params.address}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewRoundedIcon />}
          onClick={() => navigate("/")}
        >
          Generate new
        </Button>
      </Grid>
    </>
  );
};
