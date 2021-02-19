import { SET_YEAR } from "../actions/types";

//initial state for year parameter
const initialState = {
  year: 2017,
};

//year state is reinitialised if it is dispatched from actions
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_YEAR: {
      return {
        year: action.payload,
      };
    }

    default:
      return state;
  }
}
