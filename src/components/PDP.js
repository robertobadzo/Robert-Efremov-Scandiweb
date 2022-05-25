import React, { Component } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { GET_ONE_PRODUCT } from "../api"
import { Query } from 'react-apollo'
import "./PDP.css"
import { useSelector, useDispatch } from "react-redux";
import uuid from 'react-uuid'

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aImage: ""
    }
  }
  render() {
    const basicFunc = async (data) => {
      document.getElementById("pdp-description").innerHTML = data;
    }
    const id = this.props.params.id;
    return (
      <Query query={GET_ONE_PRODUCT} variables={{ id: id }}>
        {
          ({ data, loading, error }) => {

            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            // {window.onload = basicFunc(data.product.description)}
            const firstImg = data.product.gallery[0]
            const chosenCurrency = this.props.hookCurrency;
            return (

              <div className='pdp-main'>

                <div className='pdp-gallery'>
                  {data.product.gallery.map((item) =>
                    <img src={item} className='gallery-image' onLoad={() => this.setState({ aImage: this.state.aImage = firstImg })} 
                    onClick={() => this.setState({ aImage: this.state.aImage = item })}></img>)}
                </div>
                <img className='pdp-picture' src={this.state.aImage}></img>
                <div className='pdp-details'>
                  <div className='pdp-brand'>{data.product.brand}</div>
                  <div className='pdp-name'>{data.product.name}</div>
                  <div className='pdp-attributes'>
                    {data.product.attributes.map((item) => <div>{item.name}:<div className='data-type'>{item.items.map((el) => <div className='data-type-value' 
                    onClick={() => alert("kkkk")} data-type={item.type} data-value={el.value} style={{ background: el.value }}>{el.value}</div>)}</div></div>)}</div>
                  <div className='pdp-price'><div className='pdp-price-title'>PRICE:</div>
                  {data.product.prices[this.props.hookCurrency].currency.symbol}{data.product.prices[this.props.hookCurrency].amount}</div>
                  <div className='pdp-button' data-stock={data.product.inStock} 
                  onClick={() => this.props.dispatch({ type: "cc", load: { id: data.product.id, counter: 1, price: data.product.prices[chosenCurrency].amount, attributes: data.product.attributes } })}>ADD TO CART</div>
                  <div className='pdp-out-of-stock' data-stock={data.product.inStock}>OUT OF STOCK</div>
                  <div className='pdp-description' id='pdp-description' onLoad={basicFunc(data.product.description)}></div>
                </div>
              </div>
            )
          }
        }
      </Query>
    )
  }
}

const withHook = (PDP) => {
  return function WrappedComponent(props) {
    const params = useParams();
    const hookCurrency = useSelector(state => state.currencyReducer);
    const dispatch = useDispatch();
    return (
      <>
        <PDP {...props} params={params} dispatch={dispatch} hookCurrency={hookCurrency} />
      </>
    )
  }
}
export default withHook(PDP);
