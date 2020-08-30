import React, { Fragment, useState } from "react";

import Title from "../../components/Title/Title";
import BTCinput from "../../components/BTCinput/BTCinput";
import CurrencyBlock from "../CurrencyBlock/CurrencyBlock";
import { validateInput } from "../../utils/helper";
import styles from "./Form.module.css";

const Form = () => {
  const [input, setInput] = useState(1);

  const userInputHandler = (event) => {
    const value = event.target.value;
    if (validateInput(value)) setInput(value);
  };

  return (
    <Fragment>
      <div className={styles.Form}>
        <Title name="Bitcoin converter" />
        <hr></hr>
        <BTCinput inputHandler={userInputHandler} currentValue={input} />
        <hr></hr>
        <CurrencyBlock currentValue={input} />
      </div>
    </Fragment>
  );
};

export default Form;
