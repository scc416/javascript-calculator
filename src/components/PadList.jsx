import { padChar } from "../constants";
import PadListItem from "./PadListItem";

const PadList = ({ clear, calculate, updateValue }) => {
  const padElmList = padChar.map((char) => {
    return <PadListItem {...{ updateValue, char, key: char }} />;
  });

  return (
    <>
      <div id="clear" className="button" onClick={clear}>
        clear
      </div>
      {padElmList}
      <div id="equals" onClick={calculate} className="button">
        =
      </div>
      <PadListItem {...{ updateValue, char: "0" }} />
      <PadListItem {...{ updateValue, char: "." }} />
    </>
  );
};

export default PadList;
