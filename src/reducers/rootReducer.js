import { combineReducers } from "redux";
import { authReducter } from "./authReducer";
import { dataReducer } from "./dataReducer";
import { instructorsReducer } from "./instructorsReducer";
import { tableReducer } from "./tableReducer";

export const rootReducer = combineReducers({
    auth: authReducter,
    table: tableReducer,
    instructors: instructorsReducer,
    data: dataReducer
});