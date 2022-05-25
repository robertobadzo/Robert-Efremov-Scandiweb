export const clickOutside = (e) =>
 {
    if (e.target.parentNode.id === "mc-title1" ||
    e.target.parentNode.id === "mc-buttons-set-choose-attribute" ||
    e.target.parentNode.id === "mc-cart-card-attributes" ||
    e.target.parentNode.id === "pdp-attributes" ||
    e.target.parentNode.id === "mc-card" ||
    e.target.parentNode.id === "minicart" ||
    e.target.parentNode.id === "mc-cart-card-image-num" ||
    e.target.id === "mc-total" ||
    e.target.id === "mc-buttons-set-choose-attribute" ||
    e.target.id === "mc-value" ||
    e.target.id === "minicart" 
    
    ) {
    console.log(e.target.id)
    return
  }
  else if (e.target.id !== "header-cart") {
    console.log(e.target.id)
    const mcart = document.getElementById("minicart")
    if (mcart.classList.contains("visible") ) mcart.classList.remove("visible")
  }
  if (e.target.parentNode.id !== "currency-popup" &&
    e.target.parentNode.id !== "header-price" &&
    e.target.id !== "header-price") {
    const currencyWindow = document.getElementById("currency-popup")
    
    
   if (currencyWindow.classList.contains("visible")) {
     console.log("hiiiiiiii") 
     return currencyWindow.classList.remove("visible");}
  }


}