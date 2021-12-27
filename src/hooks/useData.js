import { useEffect } from "react";
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
};

export default useData;
