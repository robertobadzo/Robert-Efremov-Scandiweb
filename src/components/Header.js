import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES_CURRENCIES } from '../api'
import './Header.css'
import MiniCart from "./MiniCart"
import logo from "../util/a-logo.svg"
import cart from "../util/cart.svg"
import arrow from "../util/dropdown-arrow.svg"

export class Header extends Component {
  render() {
    const toggleCurrencyWindow = () => {
      const currencyWindow = document.getElementById("currency-popup")
      if (currencyWindow.classList.contains("visible")) {
       return currencyWindow.classList.remove("visible");
      } 
      else return currencyWindow.classList.add("visible")
    }
    
    const toggleMiniCart = () => {
      const mcart = document.getElementById("minicart")
      if (mcart.classList.contains("visible"))  {
      return mcart.classList.remove("visible")
      }  
      else return mcart.classList.add("visible")
    }
    const chosenCurrency = this.props.hookCurrency;
    return (
      <div className='wrapper'>
        <Query query={GET_CATEGORIES_CURRENCIES}>
          {
            ({ data, loading, error }) => {

              if (loading) return <div>Loading...</div>
              if (error) return <div>Error: {error}</div>
              return (
                <>

                  {/*LEFT SECTION */}
                  <div className='header-left'>
                    {data.categories.map(item => <NavLink className="remove-styling"
                      onClick={() => this.props.dispatch({ type: "aa" + item.name })} to={item.name} key={item.name} a><div className="header-category" key={item.name} >{item.name.toUpperCase()}</div></NavLink>)}
                  </div>

                  {/*MIDDLE SECTION */}
                  <div className='header-middle'>
                    <img className="header-logo" src={logo}></img>
                  </div>

                  {/*RIGHT SECTION */}
                  <div className='header-right'>
                    <div className='header-price'> <h1 className='header-currency'>{data.currencies[chosenCurrency].symbol}</h1>
                      <img className="header-arrow" src={arrow} onClick={() => toggleCurrencyWindow}></img>
                    </div>
                    <div onClick={() => toggleCurrencyWindow}>
                      <img className="header-cart" src={cart}></img>
                    </div>
                    {/*RIGHT SECTION-CURRENCY-POPUP */}
                    <div id='currency-popup' className='currency-popup'>{data.currencies.map((item)=>
                    <div onClick={() => toggleCurrencyWindow}><div key={item.label} className='choose-currency' onClick={() => this.props.dispatch({ type: "bb" + data.currencies.indexOf(item)})}>{item.symbol + " " + item.label}</div></div>)}
                    </div>
                    {/*RIGHT SECTION-MINI-CART */}
                    <MiniCart items={0} value={100} />
                  </div>

                </>
              )
            }
          }
        </Query>
      </div>
    )
  }
}

//Higher order component
const withHook = (Header) => {
  return function WrappedComponent(props) {
    const dispatch = useDispatch();
    const hookCurrency = useSelector(state => state.currencyReducer);
    const hook = useSelector(state => state.categoryReducer);
    return (
      <>
        <Header {...props} dispatch={dispatch} hook = {hook} hookCurrency={hookCurrency} />
      </>
    )
  }
}
export default withHook(Header);