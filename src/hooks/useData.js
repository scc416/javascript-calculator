import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER } from "../constants";
import { removeZeros, lastItem, isOperator } from "../helpers";

const useData = () => {
  const reducers = {
    [UPDATE_VALUE]: (state, { value, calculations }) => {
      return { value, calculations, enter: false };
    },
    [CLEAR]: () => {
      return { value: "0", calculations: [], enter: false };
    },
    [ENTER]: (state, { calculations, value }) => {
      return { value, calculations, enter: true };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    value: "0",
    calculations: [],
    enter: false,
  });

  const { value, calculations, enter } = state;

  const updateValue = (val) => {
    let newValue = val;
    let newCalculations = calculations.concat([]);

    const lastValue = lastItem(calculations);

    const lastValueIsOperator = isOperator(lastValue);
    const valueIsOperator = isOperator(value);
    const newValueIsOperator = isOperator(val);

    const addToCalculation = (val) => {
      if (val[val.length - 1] === ".") {
        val += "0";
      }
      newCalculations.push(val);
    };

    if (enter) {
      newCalculations = [];
      if (newValueIsOperator) addToCalculation(value);
    }

    if (!enter) {
      if (valueIsOperator) {
        if (newValueIsOperator) {
          if (lastValueIsOperator) {
            newCalculations.pop();
          } else if (val === "-") {
            addToCalculation(value);
          }
        } else {
          if (value === "-" && lastValue === "-") {
            newValue = "-" + newValue;
          } else {
            addToCalculation(value);
          }
        }
      }
      if (!valueIsOperator) {
        if (newValueIsOperator) {
          addToCalculation(value);
        } else {
          if (val === "." && value.includes(".")) {
            newValue = value;
          } else {
            newValue = removeZeros(value + val);
          }
        }
      }
    }

    if (newValue[0] === ".") {
      newValue = "0" + newValue;
    }

    return dispatch({
      type: UPDATE_VALUE,
      value: newValue,
      calculations: newCalculations,
    });
  };

  const calculate = () => {
    if (enter) return;

    const lastChar = lastItem(value);
    const lastCharIsDecimal = lastChar === ".";

    const lst = lastCharIsDecimal
      ? calculations.concat([value, "0"])
      : isOperator(value)
      ? calculations.concat([])
      : calculations.concat([value]);

    const lastCal = lastItem(lst);
    const lastCharIsOperator = isOperator(lastCal);
    if (lastCharIsOperator) lst.pop();

    const finalValue = eval(lst.join("").replace("--", "+"));

    return dispatch({
      type: ENTER,
      value: finalValue,
      calculations: lst.concat(["="]),
    });
  };

  const clear = () => dispatch({ type: CLEAR });

  const onKeyPress = ({ key }) => {
    if (isOperator(key) || key === "." || parseInt(key) % 1 === 0) {
      return updateValue(key);
    }
    if (key === "Enter") return calculate();
  };

  return { value, calculations, updateValue, calculate, clear, onKeyPress };
};

export default useData;
