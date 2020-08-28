import React, { Fragment, useState } from "react";
import styles from "./Form.module.css";
import BTCinput from "../components/BTCinput/BTCinput";
import CurrencyBlock from "./CurrencyBlock/CurrencyBlock";
import { validateInput } from "../utils/helper";
import Typography from "@material-ui/core/Typography";

const Form = () => {
  const [input, setInput] = useState(1);

  const userInputHandler = (event) => {
    const value = event.target.value;
    if (validateInput(value)) setInput(value);
  };

  return (
    <Fragment>
      <div className={styles.Form}>
        <div className={styles.Title}>
          <img
            src={
              "https://1000logos.net/wp-content/uploads/2018/04/Bitcoin-Logo.png"
            }
            alt="bitcoin logo"
          ></img>
          <Typography variant="h4">Bitcoin converter</Typography>
        </div>
        <hr></hr>

        <BTCinput inputHandler={userInputHandler} currentValue={input} />
        <CurrencyBlock currentValue={input} />
      </div>
    </Fragment>
  );
};

export default Form;
