import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, ENTER } from "../constants";

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
  return { currentValue, saved, enter };
};

export default useData;
