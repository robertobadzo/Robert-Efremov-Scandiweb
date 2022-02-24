import { combineReducers } from "redux";
import { categoryReducer }  from "./reducers"

export const allReducers = combineReducers (
    {
        categoryReducer,
        
    }
    )