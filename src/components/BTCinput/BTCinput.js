import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./BTCinput.module.css";

const BTCinput = ({ inputHandler, currentValue }) => {
  return (
    <div className={styles.Container}>
      <div>
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
    </div>
  );
};

export default BTCinput;
