import Screen from "./Screen";
import PadList from "./PadList";

const Calculator = ({
  value,
  calculations,
  clear,
  updateValue,
  enterAction,
}) => {
  return (
    <div className="grid-container">
      <Screen {...{ value, calculations }} />
      <PadList {...{ enterAction, clear, updateValue }} />
    </div>
  );
};

export default Calculator;
