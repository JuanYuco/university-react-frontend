import { combineReducers } from "redux";
import { authReducter } from "./authReducer";
import { coursesReducer } from "./coursesReducer";
import { instructorsReducer } from "./instructorsReducer";
import { tableReducer } from "./tableReducer";

export const rootReducer = combineReducers({
    auth: authReducter,
    courses: coursesReducer,
    table: tableReducer,
    instructors: instructorsReducer
});