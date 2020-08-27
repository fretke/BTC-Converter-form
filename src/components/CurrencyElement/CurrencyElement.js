import React from "react";
import styles from "./CurrencyElement.module.css";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const CurrencyElement = ({ currency, value, deleteItem }) => {
  return (
    <div className={styles.Element}>
      <div>
        <h1>{currency}</h1>
      </div>
      <div>
        <h1>{value}</h1>
      </div>
      <div>
        <IconButton onClick={() => deleteItem(currency)} aria-label="delete">
          <HighlightOffIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CurrencyElement;
