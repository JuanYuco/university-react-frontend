import { combineReducers } from "redux";
import { authReducter } from "./authReducer";

export const rootReducer = combineReducers({
    auth: authReducter
});