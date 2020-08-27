import React from "react";
import styles from "./BTCinput.module.css";

const BTCinput = ({ inputHandler, currentValue }) => {
  return (
    <div className={styles.Container}>
      <div>
        <h1>Enter BTC quantity</h1>
      </div>
      <div>
        <input
          onChange={(event) => {
            inputHandler(event);
          }}
          name="btcInput"
          value={currentValue}
          placeholder="enter value"
        ></input>
      </div>
    </div>
  );
};

export default BTCinput;
