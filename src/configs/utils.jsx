import _, { isUndefined } from "lodash";
import CurrencyFormat from "./curency";
import { getSessionStorage } from "./asyncStorage";
import NoImageH from "@/assets/images/No_Image_Horizontal.png";

export const getErrorResponse = (data) => {
  if (!data) return ["-"];
  if (!data.response) return ["no_response_data"];
  if (!data.response.data) return "-";
  if (typeof data.response.data.detail === "string")
    return [data.response.data.detail];
  return data.response.data.detail;
};

export const explodeObject = (obj) => {
  let query = new URLSearchParams();
  _.map(_.entries(obj), (el) => {
    if (_.isArray(el[1])) _.map(el[1], (item) => query.append(el[0], item));
    else query.append(el[0], el[1]);
  });
  return query;
};

export const handleSort = (sort, dir) => {
  return _.map(sort, (el, n) => `${el},${dir[n]}`);
};

export const handleTableData = (data, key, type = "text", option = []) => {
  let returnData;
  switch (type) {
    case "text":
      returnData = _.get(data, key);
      break;
    case "currency":
      returnData = CurrencyFormat({ value: _.get(data, key) });
      break;
    case "boolean":
      returnData = _.get(data, key) ? option[0] : option[1];
      break;
    case "option":
      let temp = _.find(option, (el) => el.value == _.get(data, key));
      returnData = temp ? temp.label : "-";
      break;
    default:
      break;
  }
  return returnData;
};

export const generate = (text = []) => {
  let generated = _.map(text, (el) => el.substring(0, 4)).join("");
  return generated;
};

export const generateRandomPassword = (length) => {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-=_+[]{}|;:,.<>?";

  const allCharacters =
    uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters.charAt(randomIndex);
  }

  return password;
};

export const checkRegex = (val, type = "phone", e) => {
  var reg;
  switch (type) {
    case "phone":
      reg = /^\d+$/;
      break;
    default:
      break;
  }
  return !reg.test(val);
};

export const elispsisText = (text, length = 50) => {
  let n = 5;
  if (text.length >= length && text.length - length > n)
    return `${text.substring(0, length - (n - 2))}...`;
  return text;
};

export const getLoginData = (key) => {
  let data = JSON.parse(getSessionStorage("login_data"));
  return _.get(data, key);
};

export const checkPhone = (e) => {
  if (checkRegex(e.key)) return e.preventDefault();
};

export const handleCombo = (item) => ({
  other: item,
  label: item.name || item.label,
  value: item.id || item._id || item.value,
});

export const countTax = (tax, price) => {
  if (isUndefined(tax) || isUndefined(price)) return 0;
  if (formatCurrencyText(tax) > 0 && formatCurrencyText(price) > 0) {
    return sumTax(
      (formatCurrencyText(tax) * formatCurrencyText(price)) / 100,
      formatCurrencyText(price)
    );
  }
};

export const formatCurrencyText = (text) => {
  if (!text) return 0;
  if (typeof text == "number") return text;
  return parseFloat(text.replaceAll(".", "").replaceAll(",", "."));
};

export const sumTax = (tax, price) => {
  return tax + price;
};

export const imageOnError = (event, type = "") => {
  event.currentTarget.src = NoImageH;
  event.currentTarget.className = `${event.currentTarget.className} error`;
};

export const getCurrentRole = () => {
  let role = "ADMIN_MERCHANT";
  try {
    role = _.get(JSON.parse(getSessionStorage("login_data")), "roleType");
  } catch (error) {}
  return role;
};

export const validateRole = (role, data = null) => {
  let isValid = false;
  if (data) {
    isValid = _.get(data, "roleType") == role;
  } else {
    let data = {};
    try {
      data = JSON.parse(getSessionStorage("login_data"));
    } catch (error) {}
    isValid = _.get(data, "roleType") == role;
  }
  return isValid;
};
