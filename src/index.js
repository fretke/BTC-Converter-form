import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Form from "./containers/Form";
import * as serviceWorker from "./serviceWorker";

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
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Form />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
