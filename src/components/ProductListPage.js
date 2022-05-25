import React, { Component } from 'react'
import "./ProductListPage.css";
import { GET_CATEGORIES_CURRENCIES, GET_PRODUCTS } from '../api/index.js'
import { Query } from 'react-apollo'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./ProductListPage.css"
import cartLogo from "../util/cart.svg"
// import { withHook } from './withHook';
import uuid from 'react-uuid';

class ProductListPage extends Component {

  render() {
    return (
      <Query query={GET_CATEGORIES_CURRENCIES}>
        {
          ({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>

            //We need to check url pathname which is the category name in order to display right products in PLP
            const checkLocation = async () => {
              const location = window.location.pathname;
              this.props.dispatch({ type: "aa" + location.substring(1) })
            }

            //Check Location when component loads
            window.onload = checkLocation();
            //Run checkLocation when pathname changes
            window.onpopstate = checkLocation;
            //Turn object in array
            const arr = data.categories
            console.log(arr)
            //Gets current category from categoryReducer
            const hook = this.props.hook;
            //Filters products which have the category which is currently active
            const filtered = arr.filter((el) => el.name === hook)[0].products;
            console.log(  filtered )
            //Chosen currency
            const chosenCurrency = this.props.hookCurrency;


            //Displays products based on category
           
            return (
              <>
              <h1 className='category-title'>{hook}</h1>
              <div className='product-card-father'>
                
                {filtered.map(item =>
                    <div key={item.id} className="product-card" 
                    onMouseEnter={() => document.getElementById(item.id).classList.add("visible")} onMouseLeave={() => document.getElementById(item.id).classList.remove("visible")}>
                      <NavLink className="remove-styling " to={`/description/${item.id}`}>
                        <img src={item.gallery[0]} className="pictures" data-stock={item.inStock}></img><div className='out-of-stock-overlay' data-stock={item.inStock}>OUT OF STOCK</div>
                        <h1 className='item-name'>{item.brand} {item.name}</h1>
                        <div className='item-price'>
                          <h1 className='price' id='price-symbol'>{item.prices[chosenCurrency].currency.symbol}</h1>
                          <h1 className='price'>{item.prices[chosenCurrency].amount}</h1>
                        </div>
                      </NavLink>
                      <div className='plp-addtocart' id={item.id} data-stock={item.inStock} 
                      onClick={() => this.props.dispatch({ type: "cc", load: {id: item.id, counter: 1, price: item.prices[chosenCurrency].amount, attributes: [] } })}>
                        <img src={cartLogo} className="plp-cartlogo" ></img></div>
                    </div>)}
                
              </div>
              </>
            )
          }
        }
      </Query>
    )
  }
}
//Higher order component
export const withHook = (ProductListPage) => {
  return function WrappedComponent(props) {
    const hook = useSelector(state => state.categoryReducer);
    const hookCurrency = useSelector(state => state.currencyReducer);
    const dispatch = useDispatch();
    return (
      <>
        <ProductListPage {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency} />
      </>
    )
  }
}

export default withHook(ProductListPage);