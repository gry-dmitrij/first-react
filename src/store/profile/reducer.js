import {TOGGLE_ACTION} from "./actions";


const initialState = {
    active: false,
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
      case TOGGLE_ACTION: {
          return {
              ...state,
              active: action.payload,
          }
      }
      default:
          return state;
  }
}
