import { combineReducers } from "redux";
import { currencyReducer, cartReducer, categoryReducer}  from "./reducers"

export const allReducers = combineReducers (
    {
        categoryReducer,
        currencyReducer, 
        cartReducer
        
    }
    )