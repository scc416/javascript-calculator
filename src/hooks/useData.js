import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER, operatorsLst } from "../constants";
import { removeZeros } from "../helpers";

const useData = () => {
  const reducers = {
    [UPDATE_VALUE]: (state, { value, removeLast, newValue }) => {
      let currentValue = value;
      let calculations = [...state.calculations];
      let { enter } = state;

      if (enter) {
        calculations = [];
        enter = false;
      }

      if (removeLast) {
        calculations.pop();
      }

      if (newValue) {
        calculations.push(newValue);
      }
      return { currentValue, calculations, enter };
    },
    [CLEAR]: () => {
      return { currentValue: "0", calculations: [], enter: false };
    },
    [ENTER]: (state, { lst, result }) => {
      if (!state.enter) {
        const calculations = [...lst, "="];
        const currentValue = result;
        return { currentValue, calculations, enter: true };
      }
      return state;
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    currentValue: "0",
    calculations: [],
    enter: false,
  });

  const { currentValue, calculations, enter } = state;

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

  const enterAct = (lst, value, ifEnter) => {
    if(ifEnter) {
      return {
        type: ENTER
      };
    }
    let removeLast = false;
    lst = operatorsLst.includes(value) ? lst : [...lst, value];
    if(lst.length > 0) {
      if(operatorsLst.includes(lst[lst.length - 1])){
        lst.pop();
      }
    }
    return { 
      type: ENTER,
      result: eval(lst.join("")),
      lst: lst
    };
  };

  const updateValue = (val, previousVal, lastItem, enter) => 
    dispatch(updateValueAction(val, previousVal, lastItem, enter));

  const enterAction = (lst, value, ifEnter) => dispatch(enterAct(lst, value, ifEnter));

  const clear = () => dispatch({type: CLEAR});
  return { currentValue, calculations, enter, updateValue, enterAction, clear };
};

export default useData;
