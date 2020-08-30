//Element that manages displayed currencies, delete, add functionalities
// as well as refreshes displayed data every minute

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Typography } from "@material-ui/core";

import CurrencyElement from "../../components/CurrencyElement/CurrencyElement";
import styles from "./CurrencyBlock.module.css";
import { formatCurrency } from "../../utils/helper";

const allCurrencies = ["USD", "GBP"];

const CurrencyBlock = ({ currentValue }) => {
  const [currencyList, setCurrencyList] = useState(allCurrencies);
  const [displayed, setDisplayed] = useState([{ name: "EUR" }]);
  const [btcData, setBtcData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [addCurrency, setAddCurrency] = useState(false);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    updateData();
  }, [currentValue, updateTrigger]);

  const removeCurrency = (name) => {
    setDisplayed((prev) => prev.filter((item) => item.name !== name));
    setCurrencyList((prev) => [...prev, name]);
  };

  const loadData = () => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        setBtcData(res.data.bpi);
        setUpdateTrigger((prev) => !prev);
      })
      .catch((err) => console.log(err, "error while getting data from api"));
  };

  const updateData = () => {
    if (displayed && btcData) {
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

  const userClickHandler = (value) => {
    const totalAmount = (+currentValue * btcData[value].rate_float).toFixed(2);
    const formatedAmount = formatCurrency(totalAmount, value);
    const displayedData = {
      name: value,
      amount: formatedAmount,
    };
    currencyList.length === 1 && setAddCurrency(false);
    setDisplayed([...displayed, displayedData]);
    setCurrencyList((prev) => {
      return prev.filter((item) => value !== item);
    });
  };

  const handleDropDownClick = () => {
    setAddCurrency(!addCurrency);
  };

  const currencies = currencyList.map((item, index) => {
    return (
      <div onClick={() => userClickHandler(item)} key={index}>
        <Typography variant="subtitle2">{item}</Typography>
      </div>
    );
  });

  const elements = displayed.map((element, index) => {
    return (
      <CurrencyElement
        key={index}
        element={element}
        deleteItem={removeCurrency}
      />
    );
  });

  return (
    <Fragment>
      <div className={currencyList.length === 0 ? styles.ElementContainer : ""}>
        {elements}
      </div>
      {currencyList.length !== 0 && (
        <div className={styles.DropDown}>
          <IconButton
            style={{ backgroundColor: "transparent" }}
            onClick={handleDropDownClick}
            aria-label="add"
          >
            {addCurrency ? (
              <ExpandLessIcon color="secondary" />
            ) : (
              <AddCircleOutlineIcon color="secondary" />
            )}
          </IconButton>
          {addCurrency && currencies}
        </div>
      )}
    </Fragment>
  );
};

export default CurrencyBlock;
