export const categoryReducer = (category = "all", action) => {
  if (action.type.substring(0, 2) === "@@") return category;
  if (action.type.substring(0, 2) === "aa") return action.type.substring(2);
  else return category;
}
export const currencyReducer = (currency = 0, action) => {
  if (action.type.substring(0, 2) === "@@") return currency;
  if (action.type.substring(0, 2) === "bb") return action.type.substring(2);
  else return currency;
}
export const cartReducer = (cart = [{ totalItems: 0}], action) => {

  //CART LOGIC 
  const spreadCart = [...cart]
  if (action.type === "cc") {
    const findIndexFunc = (product) => product.id === action.load.id;
    const index = spreadCart.findIndex(findIndexFunc);
    spreadCart[0].totalItems++
    
    if (index !== -1) {
      spreadCart[index].counter++;
      return spreadCart;
    }
    
    else {
      return [...spreadCart, action.load];}
    }
    
    //INCREMENT LOGIC
    if (action.type === "cc-ii") {
      const findIndexFunc = (product) => product.id === action.load.id;
      const index = spreadCart.findIndex(findIndexFunc);
      spreadCart[index].counter++;
      spreadCart[0].totalItems++
      return spreadCart;
    }
    //DECREMENT LOGIC
    if (action.type === "cc-dd") {
      const findIndexFunc = (product) => product.id === action.load.id;
      const index = spreadCart.findIndex(findIndexFunc);
      spreadCart[index].counter--;
      spreadCart[0].totalItems--
      if (spreadCart[index].counter === 0) spreadCart.splice(index, 1)

    return spreadCart;
  }
  //ATTRIBUTES LOGIC
  if (action.type === "cc-aa") {
    const findIndexFunc = (product) => product.id === action.load.id;
    const findIndexAttributeFunc = (attribute) => attribute.name === action.load.value.name;
    const spreadCart = [...cart]
    const index = spreadCart.findIndex(findIndexFunc);
    const nameIndex = spreadCart[index].attributes.findIndex(findIndexAttributeFunc);

    if (nameIndex !== -1) spreadCart[index].attributes[nameIndex] = action.load.value;
    else spreadCart[index].attributes.push(action.load.value);
    return spreadCart;
  }
  else return cart;


}






