

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
export const cartReducer = (cart = [], action) => {
  
 
  if(action.type === "cc") return [...cart, action.load];
   
   //INCREMENT LOGIC
   if(action.type === "cc-ii") {const findIndexFunc = (product) => product.id === action.load.id;
   const spreadCart = [...cart]
   const index = spreadCart.findIndex(findIndexFunc); 
   spreadCart[index].counter ++;
   return spreadCart;
  }
  //DECREMENT LOGIC
  if(action.type === "cc-dd") {const findIndexFunc = (product) => product.id === action.load.id;
  const spreadCart = [...cart]
  const index = spreadCart.findIndex(findIndexFunc); 
  if(spreadCart[index].counter !== 1)spreadCart[index].counter --;
  return spreadCart;
 }
  //ATTRIBUTES LOGIC
  if(action.type === "cc-aa") {
  const findIndexFunc = (product) => product.id === action.load.id;
  const findIndexAttributeFunc = (product) => product.type === action.load.value.type;
  const spreadCart = [...cart]
  const index = spreadCart.findIndex(findIndexFunc); 
  const typeIndex = spreadCart[index].attributes.find(findIndexAttributeFunc)
  alert(typeIndex)
  spreadCart[index].attributes.push(action.load.value);
  return spreadCart;
 }
 else return cart;
 
  
 }






