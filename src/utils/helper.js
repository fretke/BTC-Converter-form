const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const formatCurrency = (value, currency) => {
  const [leftSide, rightSide] = value.toString().split(".");
  const remainder = leftSide.length % 3;
  let converted = currencySymbols[currency] + leftSide.slice(0, remainder);

  for (let i = remainder, j = 0; i < leftSide.length; i++, j++) {
    if (j % 3 === 0 && converted.length !== 1) converted += ",";
    converted += leftSide[i];
  }
  return converted + "." + rightSide;
};

export const validateInput = (input) => {
  if (input.length === 0) return true;
  let reggex = /^\d+\.?\d*$/;
  if (input.match(reggex)) return true;
  return false;
};
