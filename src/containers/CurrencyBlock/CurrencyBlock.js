import React, { Fragment, useState, useEffect } from "react";
import CurrencyElement from "../../components/CurrencyElement/CurrencyElement";
import styles from "./CurrencyBlock.module.css";
import axios from "axios";

import { formatCurrency } from "../../utils/helper";

import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Typography } from "@material-ui/core";

const allCurrencies = ["USD", "GBP"];

const CurrencyBlock = ({ currentValue }) => {
  const [currencyList, setCurrencyList] = useState(allCurrencies);
  const [displayed, setDisplayed] = useState([{ name: "EUR" }]);
  const [btcData, setBtcData] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [addCurrency, setAddCurrecny] = useState(false);

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
    currencyList.length === 1 && setAddCurrecny(false);
    setDisplayed([...displayed, displayedData]);
    setCurrencyList((prev) => {
      return prev.filter((item) => value !== item);
    });
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
        currency={element.name}
        value={element.amount}
        deleteItem={removeCurrency}
      />
    );
  });

  return (
    <Fragment>
      <hr className={styles.Break}></hr>
      <div className={currencyList.length === 0 ? styles.ElementContainer : ""}>
        {elements}
      </div>
      {currencyList.length !== 0 && (
        <div className={styles.DropDown}>
          <IconButton
            style={{ backgroundColor: "transparent" }}
            onClick={() => setAddCurrecny(!addCurrency)}
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
