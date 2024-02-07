import { useState } from "react";
import CurrencyInput from "react-currency-input";

export const InputCurrency = ({
  type = "currency",
  value = 0,
  onValueChange,
  invalid = false,
  allowNull = false,
  disabled = false,
}) => {
  let component = null;
  switch (type) {
    case "currency":
      component = (
        <CurrencyInput
          disabled={disabled}
          value={value}
          onChangeEvent={(e) => {
            handleChange(e);
          }}
          allowNegative={false}
          precision={0}
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
          className={`${invalid ? "invalid" : ""} custom-input`}
        />
      );
      break;
    case "percentage":
      component = (
        <CurrencyInput
          disabled={disabled}
          value={value}
          onChangeEvent={(e) => {
            handleChange(e);
          }}
          allowNegative={false}
          precision={0}
          thousandSeparator="."
          decimalSeparator=","
          suffix=" %"
          className={`${invalid ? "invalid" : ""} custom-input`}
        />
      );
      break;
    case "number":
      component = (
        <CurrencyInput
          disabled={disabled}
          value={value}
          onChangeEvent={(e) => {
            handleChange(e);
          }}
          onValueChange={(e) => {
            handleChange(e);
          }}
          allowNegative={false}
          precision={0}
          thousandSeparator="."
          decimalSeparator=","
          className={`${invalid ? "invalid" : ""} custom-input`}
        />
      );
      break;

    default:
      break;
  }

  const [amount, setValue] = useState(0);

  const handleChange = (e) => {
    let valArr = e.target.value.split(" ");
    let val = 0;
    if (type == "currency") val = valArr[1];
    if (type == "percentage")
      val = parseInt(valArr[0].replaceAll(".", "")) > 100 ? "100" : valArr[0];
    if (type == "number") val = valArr[0];
    setValue(val);
    onValueChange(val);
  };

  return component;
};

export default InputCurrency;
