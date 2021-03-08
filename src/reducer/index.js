import { combineReducers } from "redux";
import authReducer from "./auth";
import productReducer from "./product";


let reducer = combineReducers({
    authReducer,
    productReducer,
})
export default reducer;