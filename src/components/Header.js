import React, { Component } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES_CURRENCIES } from '../api'
import './Header.css'
import MiniCart from "./MiniCart"
import logo from "../util/a-logo.svg"
import cart from "../util/cart.svg"
import arrow from "../util/dropdown-arrow.svg"
import toggleMiniCart from '../modules/toggle-minicart'
import toggleCurrencyWindow from '../modules/toggle-currency-window'

export class Header extends Component {
  
  render() {
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
                    {data.categories.map(item => <NavLink to={item.name} className={({ isActive }) => (isActive ? 'active remove-styling header-category' : 'inactive remove-styling header-category')}
                      onClick={() => { console.log(item.name); this.props.dispatch({ type: "aa" + item.name }) }} key={item.name}>{item.name.toUpperCase()}</NavLink>)}
                  </div>

                  {/*MIDDLE SECTION */}
                  <div className='header-middle'>
                    <img className="header-logo" src={logo}></img>
                  </div>

                  {/*RIGHT SECTION */}
                  <div className='header-right'>
                    <div className='header-price' id='header-price' onClick={toggleCurrencyWindow}> <h1 className='header-currency'>{data.currencies[chosenCurrency].symbol}</h1>
                      <img className="header-arrow" src={arrow} ></img>
                    </div>

                    <div>
                      <div onClick={toggleMiniCart}>
                        <img className="header-cart" id='header-cart' src={cart}></img>
                        <div className='number-of-items'>{this.props.hookCart[0].totalItems}</div>
                      </div>
                    </div>

                    {/*RIGHT SECTION-CURRENCY-POPUP */}
                    <div id='currency-popup' className='currency-popup'>{data.currencies.map((item) =>
                      <div key={item.label} onClick={toggleCurrencyWindow}><div className='choose-currency' onClick={() => this.props.dispatch({ type: "bb" + data.currencies.indexOf(item) })}>{item.symbol + " " + item.label}</div></div>)}
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
    const hookNumberOfItems = useSelector(state => [...new Set(state.cartReducer)].length);
    const hookCart = useSelector(state => state.cartReducer);
    const hook = useSelector(state => state.categoryReducer);
    const params = useParams();
    return (
      <>
        <Header {...props} hookCart = {hookCart} dispatch={dispatch} hook={hook} hookCurrency={hookCurrency} hookNumberOfItems={hookNumberOfItems} params={params} />
      </>
    )
  }
}
export default withHook(Header);