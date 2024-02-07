import { Typography } from "@material-tailwind/react";
import React from "react";

function CurrencyFormat({ value, currency }) {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency || "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return formattedValue;
}

export default CurrencyFormat;
