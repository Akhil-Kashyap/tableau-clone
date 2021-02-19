import { SET_OPTION } from "./types";

//Setting option change
export const setOption = (opt) => (dispatch) => {
  dispatch({
    type: SET_OPTION,
    payload: opt,
  });
};
