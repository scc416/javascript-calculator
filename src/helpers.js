import { operatorsLst } from "./constants";

export const removeZeros = (str) => {
  let i = str.length;
  while (i > 1 && str[0] === "0") {
    str = str.slice(1);
    i--;
  }
  return str;
};

export const lastItem = (lst) => {
  const length = lst.length;
  if (length < 1) return null;
  return lst[length - 1];
};

export const isOperator = (char) => operatorsLst.includes(char);