import { useReducer } from "react";
import { UPDATE_VALUE, CLEAR, SAVE_ITEM, ENTER } from "../constants";

const useData = () => {
  const reducers = {
    [UPDATE_VALUE]: (state) => {
      return state;
    },
    [CLEAR]: (state) => {
      return state;
    },
    [SAVE_ITEM]: (state) => {
      return state;
    },
    [ENTER]: (state) => {
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
