import React from "react";
import styles from "./CurrencyElement.module.css";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

const CurrencyElement = ({ currency, value, deleteItem }) => {
  return (
    <div className={styles.Element}>
      <div>
        <Typography variant="subtitle2">{currency}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">{value}</Typography>
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
