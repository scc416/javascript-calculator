// Redux:
const charLst = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
  decimal: "." };


const UPDATEVALUE = "UPDATEVALUE";
const CLEAR = "CLEAR";
const SAVEITEM = "SAVEITEM";
const ENTER = "ENTER";

const operatorsLst = ["+", "-", "*", "/"];

const removeZeros = str => {
  let i = str.length;
  while (i > 1 && str[0] == 0) {
    str = str.slice(1);
    i--;
  }
  return str;
};

const updateValueAction = (val, previousVal, lastItem, enter) => {
  let value = val;
  let newValue = null;
  let removeLast = false;
  const b1 = operatorsLst.includes(previousVal);
  const b2 = operatorsLst.includes(val);
  if (enter) {
    if (b2) {
      newValue = previousVal;
    }
    return {
      type: UPDATEVALUE,
      value: value,
      newValue: newValue,
      removeLast: removeLast };

  }
  if (b1) {
    if (b2) {
      if (operatorsLst.includes(lastItem)) {
        removeLast = true;
      } else if (val == "-") {
        newValue = previousVal;
      }
    } else {
      if (previousVal == "-" && lastItem == "-") {
        value = "-" + value;
      } else {
        newValue = previousVal;
      }

    }
  } else {
    if (b2) {
      newValue = previousVal;
    } else {
      if (val == "." && previousVal.split("").includes(".")) {
        value = previousVal;
      } else {
        value = removeZeros(previousVal + val);
      }
    }
  }
  if (value[0] == ".") {
    value = "0" + value;
  }
  if (newValue) {
    if (newValue[newValue.length - 1] == ".") {
      newValue += "0";
    }
  }

  return {
    type: UPDATEVALUE,
    value: value,
    newValue: newValue,
    removeLast: removeLast };

};

const enterAction = (lst, value, ifEnter) => {
  if (ifEnter) {
    return {
      type: ENTER };

  }
  let removeLast = false;
  lst = operatorsLst.includes(value) ? lst : [...lst, value];
  if (lst.length > 0) {
    if (operatorsLst.includes(lst[lst.length - 1])) {
      lst.pop();
    }
  }
  return {
    type: ENTER,
    result: eval(lst.join("")),
    lst: lst };

};

const clearAction = { type: CLEAR };

const reducer = (state = {
  currentValue: "0",
  saved: [],
  enter: false },
action) => {
  let newState = { ...state };

  switch (action.type) {
    case UPDATEVALUE:
      newState.currentValue = action.value;
      if (newState.enter) {
        newState.saved = [];
        newState.enter = false;
      }
      if (action.removeLast) {
        let temp = [...newState.saved];
        temp.pop();
        newState.saved = temp;
      }
      if (action.newValue) {
        let temp = [...newState.saved];
        temp.push(action.newValue);
        newState.saved = temp;
      }
      return newState;
    case CLEAR:
      newState.currentValue = "0";
      newState.saved = [];
      newState.enter = false;
      return newState;
    case ENTER:
      if (!newState.enter) {
        newState.saved = [...action.lst, "="];
        newState.currentValue = action.result;
        newState.enter = true;
      }
      return newState;
    default:
      return newState;}

};

const store = Redux.createStore(reducer);

// React:
const lastItem = lst => {
  const length = lst.length;
  if (length < 1) {
    return null;
  } else {
    return lst[length - 1];
  }
};

class TopLevel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const onKeyPress = key => {
      if (operatorsLst.includes(key) ||
      parseInt(key) % 1 == 0) {
        this.props.updateValue(
        key,
        this.props.currentValue,
        this.props.lastItem,
        this.props.ifEnter);

      } else if (key == "Enter") {
        this.props.enter(
        this.props.saved,
        this.props.currentValue,
        this.props.ifEnter);
      }
    };
    const numButton = num => {
      return /*#__PURE__*/(
        React.createElement("div", {
          id: num,
          className: "button",
          onClick: () =>
          this.props.updateValue(
          charLst[num],
          this.props.currentValue,
          this.props.lastItem,
          this.props.ifEnter) },

        charLst[num]));


    };
    return /*#__PURE__*/(
      React.createElement("div", {
        onKeyPress: e => onKeyPress(e.key),
        tabIndex: "0",
        className: "full" }, /*#__PURE__*/
      React.createElement("div", {
        className: "grid-container" }, /*#__PURE__*/

      React.createElement("div", { className: "button screen" }, /*#__PURE__*/
      React.createElement("div", { className: "equation" },
      this.props.saved,
      this.props.currentValue), /*#__PURE__*/

      React.createElement("div", { id: "display" },
      this.props.currentValue)), /*#__PURE__*/


      React.createElement("div", {
        id: "clear",
        className: "button",
        onClick: () => this.props.clear() }, "clear"),


      numButton("divide"),
      numButton("multiply"),
      numButton("seven"),
      numButton("eight"),
      numButton("nine"),
      numButton("subtract"),
      numButton("four"),
      numButton("five"),
      numButton("six"),
      numButton("add"),
      numButton("one"),
      numButton("two"),
      numButton("three"), /*#__PURE__*/
      React.createElement("div", { id: "equals",
        onClick: () => this.props.enter(this.props.saved, this.props.currentValue, this.props.ifEnter),
        className: "button" }, "="),

      numButton("zero"),
      numButton("decimal")), /*#__PURE__*/


      React.createElement("div", { className: "footer" }, "Design Inspired by ", /*#__PURE__*/
      React.createElement("a", { href: "https://www.apple.com/shop/product/MQ052LL/A/magic-keyboard-with-numeric-keypad-us-english-silver" }, "Magic Keyboard"))));



  }}
;

// React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = state => {
  return {
    currentValue: state.currentValue,
    saved: state.saved,
    lastItem: lastItem(state.saved),
    ifEnter: state.enter };

};

const mapDispatchToProps = dispatch => {
  return {
    updateValue: (val, previousVal, lastItem, enter) =>
    dispatch(updateValueAction(val, previousVal, lastItem, enter)),
    clear: () => dispatch(clearAction),
    enter: (lst, value, ifEnter) => dispatch(enterAction(lst, value, ifEnter)) };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(TopLevel);

class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));