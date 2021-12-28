const PadListItem = ({char, updateValue}) => {
  return (
    <div
      id={`pad-${char}`}
      onClick={() => updateValue(char)}
    >
      {char}
    </div>
  );
};

export default PadListItem;