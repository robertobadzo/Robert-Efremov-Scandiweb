import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from "react-router-dom"
import { Query } from 'react-apollo'
import { GET_ONE_PRODUCT } from '../api'
import { useQueries, useQuery } from "react-query"
import { defaultDataIdFromObject, gql } from '@apollo/client';
import "./Cart.css"
import uuid from 'react-uuid'








export class Cart extends Component {
  render() {
    const cartProducts = [...new Set(this.props.hookCart.map((item) => item))]

    return (
      <div>
        <h1 className='cart-title'>CART</h1>

        {cartProducts.map((oneItem) => (<div key={uuid()} className='full-cart-card'>  <Query className="mc-card-father" query={GET_ONE_PRODUCT} variables={{ id: oneItem.id }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error: {error}</div>

              return (
                <>
                  <h1 className='mc-cart-card-name'>{data.product.name} </h1>
                  <h1 className='mc-cart-card-price'>{data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</h1>
                  <div className='mc-cart-card-attributes'>
                    <div className='pdp-attributes flex-row'>
                      {data.product.attributes.map((item) =>
                        <div className='mc-item-name' key={uuid()}>{item.name}:<div className='mc-buttons-set-choose-attribute'>{item.items.map((el) =>
                          <div key={uuid()} className='mc-button-choose-attribute' /*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc-aa", load: { id: data.product.id, value: { value: el.value, type: item.type } } })}
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
        </Query></div>))}
      </div>)
  }

}


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
      </>
    )
  }
}
export default withHook(Cart);







