import { combineReducers } from "redux";
import { authReducter } from "./authReducer";
import { dataReducer } from "./dataReducer";

export const rootReducer = combineReducers({
    auth: authReducter,
    data: dataReducer
});