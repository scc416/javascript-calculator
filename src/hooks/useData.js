import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER, operatorsLst } from "../constants";
import { removeZeros } from "../helpers";

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
      if (!state.enter) {
        const calculations = [...lst, "="];
        const value = result;
        return { value, calculations, enter: true };
      }
      return state;
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

  const updateValue = (val, previousVal, lastItem) => {
    let value = val;
    let newValue = null;
    let removeLast = false;
    const b1 = operatorsLst.includes(previousVal);
    const b2 = operatorsLst.includes(val);
    if (enter) {
      if (b2) {
        newValue = previousVal;
      }
      return dispatch({
        type: UPDATE_VALUE,
        value,
        newValue,
        removeLast,
      });
    }
    if (b1) {
      if (b2) {
        if (operatorsLst.includes(lastItem)) {
          console.log("CONTAIN");
          removeLast = true;
        } else if (val === "-") {
          newValue = previousVal;
        }
      } else {
        if (previousVal === "-" && lastItem === "-") {
          console.log("CONTAIN");
          value = "-" + value;
        } else {
          newValue = previousVal;
        }
      }
    } else {
      if (b2) {
        newValue = previousVal;
      } else {
        if (val === "." && previousVal.split("").includes(".")) {
          value = previousVal;
        } else {
          value = removeZeros(previousVal + val);
        }
      }
    }
    if (value[0] === ".") {
      value = "0" + value;
    }
    if (newValue) {
      if (newValue[newValue.length - 1] === ".") {
        newValue += "0";
      }
    }

    return dispatch({
      type: UPDATE_VALUE,
      value,
      newValue,
      removeLast,
    });
  };

  const enterAction = (lst, value) => {
    if (enter) return dispatch({ type: ENTER });

    lst = operatorsLst.includes(value) ? lst : [...lst, value];
    if (lst.length > 0) {
      if (operatorsLst.includes(lst[lst.length - 1])) {
        lst.pop();
      }
    }
    return dispatch({
      type: ENTER,
      result: eval(lst.join("")),
      lst,
    });
  };

  const clear = () => dispatch({ type: CLEAR });

  return { value, calculations, enter, updateValue, enterAction, clear };
};

export default useData;
