import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from "react-router-dom"
import { Query } from 'react-apollo'
import { GET_ONE_PRODUCT } from '../api'
import { useQueries, useQuery } from "react-query"
import { defaultDataIdFromObject, gql } from '@apollo/client';
import "./Cart.css"








export class Cart extends Component {
  render () {
    const uniqueIds = [...new Set(this.props.hookCart)]
    
    return (
    <div>
      <h1 className='cart-title'>CART</h1>
      
       {uniqueIds.map((item) => (<div key={item} className='full-cart-card'> <Query key={item} query={GET_ONE_PRODUCT} variables={{ id: item }}> 
    {
      ({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error: {error}</div>
        return (
          
            <>
            <h1 className='mc-cart-card-name'>{data.product.name} </h1>
            <h1 className='mc-cart-card-price'>{data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</h1>
            <div className='mc-cart-card-attributes'></div>
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
  </Query></div>) )}
  </div> )}
    
  }


export const withHook = (Cart) => {
  return function WrappedComponent(props) {
    const hookCurrency = useSelector(state => state.currencyReducer);
    const hookCart = useSelector(state => state.cartReducer);
    const hook = useSelector(state => state.categoryReducer);
    const params = useParams();
   
    return (
      <>
        <Cart {...props} hook = {hook} hookCurrency={hookCurrency} hookCart={hookCart} params = {params}/>
      </>
    )
  }
}
export default withHook(Cart);
