import React, { Component } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES_CURRENCIES, GET_ONE_PRODUCT } from '../api'
import { useQueries, useQuery } from "react-query"
import { defaultDataIdFromObject, gql } from '@apollo/client';
import uuid from 'react-uuid'


import "./MiniCart.css"


class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotal: 0
    }
  }

  render() {
    // const attributeFunc = async (elValue, id) => {
    //   const findAttributes = (value) => value.value === elValue;
    //   const findIndex = (value) => value.id === id;
    //   const findWhich = this.props.hookCart.findIndex(findIndex)
    //   console.log(findWhich)
    //    const foundOne = this.props.hookCart[findWhich].attributes.find(findAttributes)
    //     if (foundOne) return foundOne;
    //     else return; 
    //   }
    const calculateTotal = async (price) => { this.setState({ cartTotal: this.state.cartTotal = + price }) }

    const cartProducts = [...new Set(this.props.hookCart.map((item) => item))]
    return (



      <>
        <div className='header-minicart' id='minicart' >
          <div className='mc-title'><h1 className='mc-title-bold'>My Bag, </h1>{cartProducts.length} items</div>

          <div className='mc-products' >{cartProducts.map((oneItem) => (
            <div key={uuid()} className='mc-card'>
              <Query className="mc-card-father" query={GET_ONE_PRODUCT} variables={{ id: oneItem.id }} >
                {
                  ({ data, loading, error }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error: {error}</div>
                    console.log(data.product.prices[0].amount)

                    return (
                      <>
                        <h1 className='mc-cart-card-name' >{data.product.name} </h1>
                        <h1 className='mc-cart-card-price'>{data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</h1>
                        <div className='mc-cart-card-attributes'>
                          <div className='pdp-attributes'>
                            {data.product.attributes.map((item) =>
                              <div className='mc-item-name' key={uuid()}>{item.name}:<div className='mc-buttons-set-choose-attribute'>{item.items.map((el) =>
                                <div key={uuid()} className='mc-button-choose-attribute' /*ON CLICK FUNCTION*/ /*onLoad={console.log (attributeFunc(el.value, oneItem.id))}*/
                                  onClick={() => this.props.dispatch({ type: "cc-aa", load: { id: data.product.id, value: { value: el.value, type: item.type } } })}
                                  data-type={item.type} data-value={el.value} style={{ background: el.value }}>{el.value}</div>)}</div></div>)}</div>
                        </div>
                        <div className='mc-cart-card-image-numberof'>
                          <div className='mc-cart-card-image-num'>
                            <div className='mc-cart-increment' /*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc-ii", load: { id: data.product.id } })}>+</div>
                            <div className='mc-cart-counter'>{oneItem.counter}</div>
                            <div className='mc-cart-decrement'/*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc-dd", load: { id: data.product.id } })}>-</div>
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
            <h1 className='mc-value'>${this.state.cartTotal}</h1>
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
