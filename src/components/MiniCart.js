import React, { Component } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES_CURRENCIES, GET_ONE_PRODUCT } from '../api'
import { useQueries, useQuery } from "react-query"
import { defaultDataIdFromObject, gql } from '@apollo/client';


import "./MiniCart.css"


class MiniCart extends Component {

  render() {

    const uniqueIds = [...new Set(this.props.hookCart)]
    console.log(uniqueIds)
    return (



      <>
        <div className='header-minicart' id='minicart'>
          <div className='mc-title'><h1 className='mc-title-bold'>My Bag, </h1>{uniqueIds.length} items</div>
          
          <div className='mc-products'>{uniqueIds.map((item) => (
              <div key={item} className='mc-card'>
                <Query className = "mc-card-father" key={item} query={GET_ONE_PRODUCT} variables={{ id: item }}>
                  {
                    ({ data, loading, error }) => {
                      if (loading) return <div>Loading...</div>
                      if (error) return <div>Error: {error}</div>
                      return (
                        <>
                        <h1 className='mc-cart-card-name'>{data.product.name} </h1>
                        <h1 className='mc-cart-card-price'>{data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</h1>
                        <div className='mc-cart-card-attributes'>
                          <div className='pdp-attributes'>
                            {data.product.attributes.map((item) => 
                            <div className='mc-item-name'>{item.name}:<div className='mc-buttons-set-choose-attribute'>{item.items.map((el) => 
                            <div className='mc-button-choose-attribute' /*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc", load: {value: el.value } })} data-type={item.type} data-value={el.value} style={{background: el.value}}>{el.value}</div>)}</div></div>)}</div>
                            </div>
                        <div className='mc-cart-card-image-numberof'>
                           <div className='mc-cart-card-image-num'>
                            <div className='mc-cart-increment'>+</div>
                            <div className='mc-cart-counter'>0</div>
                            <div className='mc-cart-decrement'>-</div>
                            </div>
                            <img src={data.product.gallery[0]} className="mc-cart-image"></img>
                        </div>
                        </>
                      )

                    }
                  }
                </Query>
              </div>
    ))



            }

          </div>
          <div className='mc-buttons'>
            <h1 className='mc-total'>Total</h1>
            <h1 className='mc-value'>${this.props.value}</h1>
            <NavLink to="/cart" className='remove-styling view-bag'> <div>VIEW BAG</div> </NavLink>
            <div className='mc-checkout'>CHECKOUT</div>
          </div>
        </div>


      </>
    )

  }
}




const withHook = (MiniCart) => {
  return function WrappedComponent(props) {
    const hookCurrency = useSelector(state => state.currencyReducer);
    const hookCart = useSelector(state => state.cartReducer);
    const hook = useSelector(state => state.categoryReducer);
    const params = useParams();
    const dispatch = useDispatch();

    return (
      <>
        <MiniCart {...props} hook={hook} dispatch={dispatch} hookCurrency={hookCurrency} hookCart={hookCart} params={params} />
      </>
    )
  }
}
export default withHook(MiniCart);
