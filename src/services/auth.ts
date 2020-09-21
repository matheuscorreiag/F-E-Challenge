import { environment } from "../environment/environment";

const { REACT_APP_LOCAL_STORAGE_USER } = environment;

const userAuth = {
  user: JSON.parse(localStorage.getItem(REACT_APP_LOCAL_STORAGE_USER)) || "",
};

export const isAuthenticated = () => {
  if (userAuth.user != "" && userAuth.user.token !== "") {
    return true;
  }
  return false;
};

/* export const getToken = () => {
  userAuth.token = String(JSON.parse(userAuth.token));
  if (userAuth.token !== "") {
    return userAuth.token;
  }
  return ""; 
};*/
