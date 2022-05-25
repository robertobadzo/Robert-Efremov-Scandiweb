import Cart from "./Cart";
import MiniCart from "./MiniCart";
import ProductListPage from "./ProductListPage";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from "react-router-dom"

export const withHook = (Cart) => {
    return function WrappedComponent(props) {
      const hookCurrency = useSelector(state => state.currencyReducer);
      const hookCart = useSelector(state => state.cartReducer);
      const hook = useSelector(state => state.categoryReducer);
      const params = useParams();
      const dispatch = useDispatch();
  
      return (
        <>
          <Cart {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency} hookCart={hookCart} params={params} />
          <ProductListPage {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency} />
          <MiniCart {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency} hookCart={hookCart} params={params} />

        </>
      )
    }
  }