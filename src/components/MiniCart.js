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
      cartTotal: 100,
      attributes: false
    }
  }

  componentDidMount(){
// api call 
// update data state
// this.setState({data: })
this.setState({ cartTotal: this.state.cartTotal += 10 })
  }

  render() {
  
   // const calculateTotal = async () => { this.setState({ cartTotal:  }) }
    const cartProducts = [...new Set(this.props.hookCart.map((item) => item))]
    return (
      
      <>
        <div className='header-minicart' id='minicart' >
          <div className='mc-title' id='mc-title1'><h1 className='mc-title-bold'>My Bag, </h1>{this.props.hookCart[0].totalItems} items</div>

          <div className='mc-products'>{cartProducts.slice(1).map((oneItem) => (
            <div key={uuid()} className='mc-card' id='mc-card'>
              <Query className="mc-card-father" query={GET_ONE_PRODUCT} variables={{ id: oneItem.id }} >
                {
                  ({ data, loading, error }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error: {error}</div>
                    const chosenCurrency = this.props.hookCurrency;
                    return (
                      <>
                        <h1 className='mc-cart-card-name' >{data.product.name} </h1>
                        <h1 className='mc-cart-card-price'>{data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</h1>
                        <div className='mc-cart-card-attributes' id='mc-cart-card-attributes'>
                          <div className='pdp-attributes' id='pdp-attributes'>
                            {data.product.attributes.map((item) =>
                              <div className='mc-item-name' key={uuid()}>{item.name}:<div className='mc-buttons-set-choose-attribute' id='mc-buttons-set-choose-attribute'>

                                {item.items.map((el) =>
                                  <div key={uuid()} className='mc-button-choose-attribute' /*ON CLICK FUNCTION*/ 
                                    onClick={(e) => { e.currentTarget.className = "mc-test"; 
                                    this.props.dispatch({ type: "cc-aa", load: { id: data.product.id,  value: { value: el.value, attributeId: el.id, name: item.name } } }) 
                                  }}
                                    data-type={item.type} >{el.value}</div>)}</div></div>)}</div>
                        </div>
                        <div className='mc-cart-card-image-numberof'>
                          <div className='mc-cart-card-image-num' id='mc-cart-card-image-num'>
                            <div className='mc-cart-increment' /*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc-ii", load: { id: data.product.id, price: data.product.prices[chosenCurrency].amount } })}>+</div>
                            <div className='mc-cart-counter'>{oneItem.counter}</div>
                            <div className='mc-cart-decrement'/*ON CLICK FUNCTION*/ onClick={() => this.props.dispatch({ type: "cc-dd", load: { id: data.product.id, price: data.product.prices[chosenCurrency].amount } })}>-</div>
                          </div>
                          <img src={data.product.gallery[0]} className="mc-cart-image"></img>
                      <div >{data.product.prices.currency}</div>
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
          <div className='mc-buttons' id='mc-buttons'>
            <h1 className='mc-total' id='mc-total'>Total</h1>
            <h1 className='mc-value' id='mc-value'> {this.state.cartTotal}</h1>
            <NavLink to="/cart" className='remove-styling view-bag' id='view-bag'> <div>VIEW BAG</div> </NavLink>
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
