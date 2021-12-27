import useData from "./hooks/useData";

const App = () => {
  const { value, calculations, updateValue, enterAction, clear, onKeyPress } = useData();

  const numButton = (num) => {
    return (
      <div
        id={`pad-${num}`}
        className="button"
        onClick={() => updateValue(num)}
      >
        {num}
      </div>
    );
  };

  return (
    <div onKeyPress={onKeyPress} tabIndex="0" className="full">
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
        {numButton("/")}
        {numButton("*")}
        {numButton("7")}
        {numButton("8")}
        {numButton("9")}
        {numButton("-")}
        {numButton("4")}
        {numButton("5")}
        {numButton("6")}
        {numButton("+")}
        {numButton("1")}
        {numButton("2")}
        {numButton("3")}
        <div id="equals" onClick={enterAction} className="button">
          =
        </div>
        {numButton("0")}
        {numButton(".")}
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
