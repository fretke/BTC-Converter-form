import React from "react";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import styles from "./BTCinput.module.css";

const BTCinput = ({ inputHandler, currentValue }) => {
  return (
    <div className={styles.Container}>
      <div>
        <Typography variant="h6">Enter value</Typography>
      </div>
      <TextField
        color="primary"
        onChange={(event) => {
          inputHandler(event);
        }}
        name="btcInput"
        value={currentValue}
        id="outlined-basic"
        label="Quantity"
      />
    </div>
  );
};

export default BTCinput;
