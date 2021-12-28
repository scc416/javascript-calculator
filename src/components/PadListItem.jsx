import { parseChar } from "../helpers";

const PadListItem = ({char, updateValue}) => {
  return (
    <div
      id={`pad-${char}`}
      onClick={() => updateValue(char)}
    >
      {parseChar(char)}
    </div>
  );
};

export default PadListItem;