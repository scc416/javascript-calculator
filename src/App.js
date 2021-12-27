import useData from "./hooks/useData";
import { charLst, operatorsLst } from "./constants";

const lastItem = (lst) => {
  const length = lst.length;
  if (length < 1) return null;
  return lst[length - 1];
};

const App = () => {
  const { value, calculations, enter, updateValue, enterAction, clear } =
    useData();

  const numButton = (num) => {
    return (
      <div
        id={num}
        className="button"
        onClick={() => updateValue(charLst[num], value, lastItem)}
      >
        {charLst[num]}
      </div>
    );
  };

  const onKeyPress = (key) => {
    if (operatorsLst.includes(key) || parseInt(key) % 1 == 0) {
      updateValue(key, value, lastItem);
    } else if (key == "Enter") {
      enterAction(calculations, value);
    }
  };

  return (
    <div onKeyPress={(e) => onKeyPress(e.key)} tabIndex="0" className="full">
      <div className="grid-container">
        <div className="button screen">
          <div className="equation">
            {calculations}
            {value}
          </div>
          <div id="display">{value}</div>
        </div>
        <div id="clear" className="button" onClick={clear}>
          clear
        </div>
        {numButton("divide")}
        {numButton("multiply")}
        {numButton("seven")}
        {numButton("eight")}
        {numButton("nine")}
        {numButton("subtract")}
        {numButton("four")}
        {numButton("five")}
        {numButton("six")}
        {numButton("add")}
        {numButton("one")}
        {numButton("two")}
        {numButton("three")}
        <div
          id="equals"
          onClick={() => enterAction(calculations, value)}
          className="button"
        >
          =
        </div>
        {numButton("zero")}
        {numButton("decimal")}
      </div>
      <div className="footer">
        Design Inspired by{" "}
        <a href="https://www.apple.com/shop/product/MQ052LL/A/magic-keyboard-with-numeric-keypad-us-english-silver">
          Magic Keyboard
        </a>
      </div>
    </div>
  );
};

export default App;
