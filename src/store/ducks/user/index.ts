import { Reducer } from "redux";
import { UserState, UserTypes } from "./types";
import { environment } from "../../../environment/environment";

const { REACT_APP_LOCAL_STORAGE_USER } = environment;

const INITIAL_STATE: UserState = {
  user: {
    id: "",
    token: "",
    email: "",
    name: "",
    password: "",
  },
};
const LOGGED_USER: UserState = {
  user: JSON.parse(localStorage.getItem(REACT_APP_LOCAL_STORAGE_USER)),
};

const userloggedin = LOGGED_USER ? LOGGED_USER : INITIAL_STATE;
const reducer: Reducer<UserState> = (state = userloggedin, action) => {
  const updatedUserState = state;
  const address = environment.REACT_APP_LOCAL_STORAGE_USER;
  switch (action.type) {
    case UserTypes.UPDATE_USER:
      updatedUserState.user = action.data.user;
      localStorage.setItem(address, JSON.stringify(updatedUserState.user));

      return { ...state, ...updatedUserState };

    case UserTypes.REMOVE_USER:
      localStorage.removeItem(address);
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};

export default reducer;
