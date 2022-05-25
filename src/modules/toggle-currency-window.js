const toggleCurrencyWindow = () => {
    const currencyWindow = document.getElementById("currency-popup")
    if (currencyWindow.classList.contains("visible")) {
      return currencyWindow.classList.remove("visible");
    }
    else return currencyWindow.classList.add("visible")
  }
  export default toggleCurrencyWindow;