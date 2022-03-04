

export const categoryReducer = (category = "all", action) => {
  if(action.type.substring(0,2) === "@@") return category;
  if(action.type.substring(0,2) === "aa") return action.type.substring(2);
  else return category;
 }
export const currencyReducer = (currency = 0, action) => {
  if(action.type.substring(0,2) === "@@") return currency;
  if(action.type.substring(0,2) === "bb") return action.type.substring(2);
  else return currency;
 }






