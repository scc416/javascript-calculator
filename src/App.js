import useData from "./hooks/useData";
import { charLst, operatorsLst } from "./constants";

const lastItem = (lst) => {
  const length = lst.length;
  if (length < 1) {
    return null;
  } else {
    return lst[length - 1];
  }
};

const App = () => {
  const { currentValue, calculations, enter, updateValue, enterAction, clear } =
    useData();

  const numButton = (num) => {
    return (
      <div
        id={num}
        className="button"
        onClick={() => updateValue(charLst[num], currentValue, lastItem, enter)}
      >
        {charLst[num]}
      </div>
    );
  };

  const onKeyPress = (key) => {
    if (operatorsLst.includes(key) || parseInt(key) % 1 == 0) {
      updateValue(key, currentValue, lastItem, enter);
    } else if (key == "Enter") {
      enterAction(calculations, currentValue, enter);
    }
  };

  return (
    <div onKeyPress={(e) => onKeyPress(e.key)} tabIndex="0" className="full">
      <div className="grid-container">
        <div className="button screen">
          <div className="equation">
            {calculations}
            {currentValue}
          </div>
          <div id="display">{currentValue}</div>
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
          onClick={() => enterAction(calculations, currentValue, enter)}
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
