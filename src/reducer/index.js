import { combineReducers } from "redux";
import authReducer from "./auth";
import productReducer from "./product";
import salesReducer from "./sales";


let reducer = combineReducers({
    authReducer,
    productReducer,
    salesReducer,
})
export default reducer;