import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import job from "./job";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  job,
});
