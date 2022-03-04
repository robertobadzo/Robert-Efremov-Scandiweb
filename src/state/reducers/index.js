import { combineReducers } from "redux";
import { categoryReducer }  from "./reducers"
import { currencyReducer }  from "./reducers"

export const allReducers = combineReducers (
    {
        categoryReducer,
        currencyReducer
        
    }
    )