import { parseCalculations } from "../helpers";

const Screen = ({ value, calculations }) => {
  return (
    <div className="screen">
      <div>
        {parseCalculations(calculations)}
        {value}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default Screen;
