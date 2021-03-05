import { combineReducers } from "redux";
import authReducer from "./auth";


let reducer = combineReducers({
    authReducer,
})
export default reducer;