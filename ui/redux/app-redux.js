import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
  isEmployer: false
};

// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setIsEmployer":
      return { ...state, setIsEmployer: action.value };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };

//action creators

const setIsEmployer = isEmployer => {
  return {
    type: "setIsEmployer",
    value: isEmployer
  };
};
export { setIsEmployer };
