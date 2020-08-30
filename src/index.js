import React from "react";
import ReactDOM from "react-dom";

import Form from "./containers/Form/Form";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#616161",
      main: "#424242",
      dark: "#212121",
    },
    secondary: {
      main: "#F7931A",
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Form />
  </MuiThemeProvider>,
  document.getElementById("root")
);
