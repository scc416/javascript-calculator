import Screen from "./Screen";
import PadList from "./PadList";

const Calculator = ({
  value,
  calculations,
  clear,
  updateValue,
  calculate,
}) => {
  return (
    <div className="grid-container">
      <Screen {...{ value, calculations }} />
      <PadList {...{ calculate, clear, updateValue }} />
    </div>
  );
};

export default Calculator;
