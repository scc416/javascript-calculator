import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER, operatorsLst } from "../constants";
import { removeZeros, lastItem } from "../helpers";

const useData = () => {
  const reducers = {
    [UPDATE_VALUE]: (state, { value, removeLast, newValue }) => {
      let calculations = [...state.calculations];
      let { enter } = state;

      if (enter) {
        calculations = [];
        enter = false;
      }

      if (removeLast) calculations.pop();

      if (newValue) calculations.push(newValue);

      return { value, calculations, enter };
    },
    [CLEAR]: () => {
      return { value: "0", calculations: [], enter: false };
    },
    [ENTER]: (state, { lst, result }) => {
      if (state.enter) return state;

      const calculations = [...lst, "="];
      const value = result;
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
    let theValue = val;
    let newValue = null;
    let removeLast = false;
    const b1 = operatorsLst.includes(value);
    const b2 = operatorsLst.includes(val);
    if (enter) {
      if (b2) {
        newValue = value;
      }
      return dispatch({
        type: UPDATE_VALUE,
        value: theValue,
        newValue,
        removeLast,
      });
    }
    if (b1) {
      if (b2) {
        if (operatorsLst.includes(lastItem(calculations))) {
          removeLast = true;
        } else if (val === "-") {
          newValue = value;
        }
      } else {
        if (value === "-" && lastItem(calculations) === "-") {
          console.log("CONTAIN");
          theValue = "-" + theValue;
        } else {
          newValue = value;
        }
      }
    } else {
      if (b2) {
        newValue = value;
      } else {
        if (val === "." && value.includes(".")) {
          theValue = value;
        } else {
          theValue = removeZeros(value + val);
        }
      }
    }
    if (theValue[0] === ".") {
      theValue = "0" + theValue;
    }
    if (newValue) {
      if (newValue[newValue.length - 1] === ".") {
        newValue += "0";
      }
    }

    return dispatch({
      type: UPDATE_VALUE,
      value: theValue,
      newValue,
      removeLast,
    });
  };

  const calculate = () => {
    if (enter) return dispatch({ type: ENTER });

    const lst =
      value[value.length - 1] === "."
        ? [...calculations, value, "0"]
        : operatorsLst.includes(value)
        ? [...calculations]
        : [...calculations, value];

    return dispatch({
      type: ENTER,
      result: eval(lst.join("")),
      lst,
    });
  };

  const clear = () => dispatch({ type: CLEAR });

  const onKeyPress = ({ key }) => {
    if (operatorsLst.includes(key) || key === "." || parseInt(key) % 1 === 0) {
      updateValue(key);
    } else if (key === "Enter") {
      calculate();
    }
  };

  return { value, calculations, updateValue, calculate, clear, onKeyPress };
};

export default useData;
