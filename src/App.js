import useData from "./hooks/useData";
import { charLst } from "./constants";

const numButton = (num) => {
  return (
    <div
      id={num}
      className="button"
      onClick={
        () => console.log("onclick")
        // this.props.updateValue(
        //   charLst[num],
        //   this.props.currentValue,
        //   this.props.lastItem,
        //   this.props.ifEnter)
      }
    >
      {charLst[num]}
    </div>
  );
};

const App = () => {
  const { currentValue, saved, enter } = useData();
  return (
    <div
      onKeyPress={
        () => console.log("onKeyPress")
        // (e) => onKeyPress(e.key)
      }
      tabIndex="0"
      className="full"
    >
      <div className="grid-container">
        <div className="button screen">
          <div className="equation">
            {saved}
            {currentValue}
          </div>
          <div id="display">{currentValue}</div>
        </div>
        <div
          id="clear"
          className="button"
          onClick={
            () => console.log("onclick")
            // () => this.props.clear()
          }
        >
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
          onClick={
            () => console.log("onclick")
            // this.props.enter(
            //   this.props.saved,
            //   this.props.currentValue,
            //   this.props.ifEnter
            // )
          }
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
