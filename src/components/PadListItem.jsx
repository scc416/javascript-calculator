const PadListItem = ({char, updateValue}) => {
  return (
    <div
      id={`pad-${char}`}
      className="button"
      onClick={() => updateValue(char)}
    >
      {char}
    </div>
  );
};

export default PadListItem;