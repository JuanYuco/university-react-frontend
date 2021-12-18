import { combineReducers } from "redux";
import { authReducter } from "./authReducer";
import { coursesReducer } from "./coursesReducer";

export const rootReducer = combineReducers({
    auth: authReducter,
    courses: coursesReducer
});