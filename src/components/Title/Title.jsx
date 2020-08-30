import React from "react";
import Typography from "@material-ui/core/Typography";

import styles from "./Title.module.css";

const Title = ({ name }) => {
  return (
    <div className={styles.Title}>
      <img
        src={
          "https://1000logos.net/wp-content/uploads/2018/04/Bitcoin-Logo.png"
        }
        alt="bitcoin logo"
      ></img>
      <Typography variant="h4">{name}</Typography>
    </div>
  );
};

export default Title;
