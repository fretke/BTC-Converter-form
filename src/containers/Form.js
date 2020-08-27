import React, { Fragment, useState } from "react";
import styles from "./Form.module.css";
import BTCinput from "../components/BTCinput/BTCinput";
import CurrencyBlock from "../components/CurrencyBlock/CurrencyBlock";

const Form = () => {
  const [input, setInput] = useState(0);

  const userInputHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <Fragment>
      <div className={styles.Form}>
        <h1>BTC converter</h1>
        <BTCinput inputHandler={userInputHandler} currentValue={input} />
        <CurrencyBlock currentValue={input} />
      </div>
    </Fragment>
  );
};

export default Form;
