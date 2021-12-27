import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER, operatorsLst } from "../constants";

const removeZeros = (str) => {
  let i = str.length;
  while (i > 1 && str[0] == 0) {
    str = str.slice(1);
    i--;
  }
  return str;
}

const useData = () => {
  const reducers = {
    [UPDATE_VALUE]: (state, { value, removeLast, newValue }) => {
      let currentValue = value;
      let saved = [...state.saved];
      let { enter } = state;

      if (enter) {
        saved = [];
        enter = false;
      }

      if (removeLast) {
        saved.pop();
      }

      if (newValue) {
        saved.push(newValue);
      }
      return { currentValue, saved, enter };
    },
    [CLEAR]: () => {
      return { currentValue: "0", saved: [], enter: false };
    },
    [ENTER]: (state, { lst, result }) => {
      if (!state.enter) {
        const saved = [...lst, "="];
        const currentValue = result;
        return { currentValue, saved, enter: true };
      }
      return state;
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    currentValue: "0",
    saved: [],
    enter: false,
  });

  const { currentValue, saved, enter } = state;

  const updateValueAction = (val, previousVal, lastItem, enter) => {
    let value = val;
    let newValue = null;
    let removeLast = false;
    const b1 = operatorsLst.includes(previousVal);
    const b2 = operatorsLst.includes(val);
    if(enter) {
      if (b2) {
        newValue = previousVal;
      }
      return {
        type: UPDATE_VALUE,
        value: value,
        newValue: newValue,
        removeLast: removeLast
      };
    }
    if (b1) {
      if (b2) {
        if(operatorsLst.includes(lastItem)){
          removeLast = true;
        } else if (val == "-") {
          newValue = previousVal;
        }
      } else {
        if(previousVal == "-" && lastItem == "-") {
          value = "-" + value;
        } else {
          newValue = previousVal;
        }
        
      }
    } else {
      if (b2) {
        newValue = previousVal;
      } else {
        if(val == "." && previousVal.split("").includes(".")) {
          value = previousVal;
        } else {
          value = removeZeros(previousVal + val);
        }
      }
    }
    if(value[0] == ".") {
      value = "0" + value;
    }
    if (newValue) {
      if(newValue[newValue.length - 1 ] == ".") {
      newValue += "0";
      }
    }
    
    return { 
      type: UPDATE_VALUE,
      value: value,
      newValue: newValue,
      removeLast: removeLast
    };
  };

  const updateValue = (val, previousVal, lastItem, enter) => 
    dispatch(updateValueAction(val, previousVal, lastItem, enter));

  return { currentValue, saved, enter, updateValue };
};

export default useData;
