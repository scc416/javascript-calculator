export const removeZeros = (str) => {
  let i = str.length;
  while (i > 1 && str[0] === 0) {
    str = str.slice(1);
    i--;
  }
  return str;
}