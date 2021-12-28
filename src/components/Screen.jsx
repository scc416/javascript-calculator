import { parseCalculations, parseChar } from "../helpers";

const Screen = ({ value, calculations }) => {
  const displayChar = parseChar(value);
  return (
    <div className="screen">
      <div>
        {parseCalculations(calculations)}
        {displayChar}
      </div>
      <div>{displayChar}</div>
    </div>
  );
};

export default Screen;
