import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
  userToken: null,
  isEmployer: false
};

// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setIsEmployer":
      return { ...state, isEmployer: action.value };
    case "setUserToken":
      return { ...state, userToken: action.value };
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

const setUserToken = userToken => {
  return {
    type: "setUserToken",
    value: userToken
  };
};
export { setUserToken };
