export const categoryReducer = (category = "all", action) => {
  if(action.type.substring(0,2) === "@@") return category;
   else return action.type;
 }




