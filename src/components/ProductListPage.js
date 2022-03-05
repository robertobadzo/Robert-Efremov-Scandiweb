import React, { Component } from 'react'
import "./ProductListPage.css";
import { GET_PRODUCTS } from '../api/index.js'
import { Query } from 'react-apollo'
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./ProductListPage.css"
import cartLogo from "../util/cart.svg"

class ProductListPage extends Component {

  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {
          ({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            //We need to check url pathname which is the category name in order to display right products in PLP
            const checkLocation = () => {
              const location = window.location.pathname;
              this.props.dispatch({ type: "aa" + location.substring(1) })
            }
            //Check Location when component loads
            window.onload = checkLocation;
            //Run checkLocation when pathname changes
            window.onpopstate = checkLocation;
            //Turn object in array
            const arr = Object.values(data)
            //Gets current category from categoryReducer
            const hook = this.props.hook;
            //Filters products which have the category which is currently active
            const filtered = arr.filter((el) => el.category === hook);
            //Chosen currency
            const chosenCurrency = this.props.hookCurrency;

        
            
           //ADD OUT OF STOCK BEHAVIOR
           //ADD OUT OF STOCK BEHAVIOR
           //ADD OUT OF STOCK BEHAVIOR
           //ADD OUT OF STOCK BEHAVIOR
           //ADD OUT OF STOCK BEHAVIOR
         
          
            //Displays all products
            if (hook === "all") return (
              <>
              <h1 className='category-title'>All</h1>
              <div className='product-card-father'>
                {arr.map(item =>
                  <div key={item.id} className="product-card" onMouseEnter={() => document.getElementById(item.id).classList.add("visible")} onMouseLeave={() => document.getElementById(item.id).classList.remove("visible")}>
                    <NavLink className="remove-styling " to={`/description/${item.id}`}>
                      <img src={item.gallery[0]} className="pictures"></img>
                      <h1 className='item-name'>{item.name}</h1>
                      <div className='item-price'>
                      <h1 className='price'>{item.prices[chosenCurrency].currency.symbol}</h1>
                      <h1 className='price'>{item.prices[chosenCurrency].amount}</h1>
                      </div>
                    </NavLink>
                    <div className='plp-addtocart' id={item.id} onClick={() => this.props.dispatch({ type: "cc", load: item.id })}><img src={cartLogo} className="plp-cartlogo" ></img></div>
                  </div>)}
              </div>
              </>
            )
            //Displays filtered products by category
            return (
              <>
              <h1 className='category-title'>{filtered[0].category}</h1>
              <div className='product-card-father'>
                {filtered.map(item =>
                  <div key={item.id} className="product-card" onMouseEnter={() => document.getElementById(item.id).classList.add("visible")} onMouseLeave={() => document.getElementById(item.id).classList.remove("visible")}>
                    <NavLink className="remove-styling " to={`/description/${item.id}`}>
                      <img src={item.gallery[0]} className="pictures"></img>
                      <h1 className='item-name'>{item.name}</h1>
                      <div className='item-price'>
                      <h1 className='price'>{item.prices[chosenCurrency].currency.symbol}</h1>
                      <h1 className='price'>{item.prices[chosenCurrency].amount}</h1>
                      </div>
                    </NavLink>
                    <div className='plp-addtocart' id={item.id} onClick={() => this.props.dispatch({ type: "cc", load: item.id })}><img src={cartLogo} className="plp-cartlogo" ></img></div>
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
        <ProductListPage {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency}/>
      </>
    )
  }
}

export default withHook(ProductListPage);