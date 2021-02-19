import { SET_YEAR } from "./types";

//setting year change
export const setYear = (yr) => (dispatch) => {
  dispatch({
    type: SET_YEAR,
    payload: yr,
  });
};
