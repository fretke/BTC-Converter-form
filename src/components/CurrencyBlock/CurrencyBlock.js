// eslint-disable-next-line react-hooks/exhaustive-deps

import React, { Fragment, useState, useEffect } from "react";
import CurrencyElement from "../CurrencyElement/CurrencyElement";
import styles from "./CurrencyBlock.module.css";
import axios from "axios";

import { formatCurrency } from "../../utils/currencyConvertion";

const allCurrencies = ["", "EUR", "USD", "GBP"];

const CurrencyBlock = ({ currentValue }) => {
  const [currencyList, setCurrencyList] = useState(allCurrencies);
  const [displayed, setDisplayed] = useState([]);
  const [btcData, setBtcData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      loadData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("updating data");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updateData();
  }, [currentValue, updateTrigger]);

  const removeCurrency = (name) => {
    console.log(name, "<- we are removing this");
    setDisplayed((prev) => prev.filter((item) => item.name !== name));
    setCurrencyList((prev) => [...prev, name]);
  };

  const loadData = () => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        setBtcData(res.data.bpi);
        setUpdateTrigger((prev) => !prev);
        console.log(updateTrigger, "updateTrigger");
        console.log(res.data, "response from axios");
      })
      .catch((err) => console.log(err, "error while getting data from api"));
  };

  const currencies = currencyList.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  const elements = displayed.map((element, index) => {
    return (
      <CurrencyElement
        key={index}
        currency={element.name}
        value={element.amount}
        deleteItem={removeCurrency}
      />
    );
  });

  const updateData = () => {
    if (displayed) {
      const updatedList = displayed.map((element) => {
        const newAmount = (
          +currentValue * btcData[element.name].rate_float
        ).toFixed(2);
        return {
          ...element,
          amount: formatCurrency(newAmount, element.name),
        };
      });
      setDisplayed(updatedList);
    }
  };

  const userClickHandler = (event) => {
    const value = event.target.value;
    const totalAmount = (+currentValue * btcData[value].rate_float).toFixed(2);
    const formatedAmount = formatCurrency(totalAmount, value);
    const displayedData = {
      name: value,
      amount: formatedAmount,
    };
    // console.log(btcData[value], "selected currency value");
    setDisplayed([...displayed, displayedData]);
    setCurrencyList((prev) => {
      return prev.filter((item) => value !== item);
    });
  };

  return (
    <div>
      {elements}
      {currencyList.length > 1 && (
        <Fragment>
          <h1 className={styles.SubTitle}>Add Currencies to display</h1>
          <select
            className={styles.DropDown}
            onChange={(e) => userClickHandler(e)}
            name="cars"
            value=""
          >
            {currencies}
          </select>
        </Fragment>
      )}
    </div>
  );
};

export default CurrencyBlock;
