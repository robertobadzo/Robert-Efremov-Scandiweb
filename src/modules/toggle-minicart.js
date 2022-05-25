 const toggleMiniCart = () => {
      const mcart = document.getElementById("minicart")
      if (mcart.classList.contains("visible")) {
        return mcart.classList.remove("visible")
      }
      else return mcart.classList.add("visible")
    }
    export default toggleMiniCart;