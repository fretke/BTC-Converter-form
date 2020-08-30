import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

import styles from "./CurrencyElement.module.css";

const CurrencyElement = ({ element, deleteItem }) => {
  const { name, amount } = element;

  return (
    <div className={styles.Element}>
      <div>
        <Typography variant="subtitle2">{name}</Typography>
      </div>
      <div>
        <Typography variant="subtitle2">{amount}</Typography>
      </div>
      <div>
        <IconButton onClick={() => deleteItem(name)} aria-label="delete">
          <HighlightOffIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CurrencyElement;
