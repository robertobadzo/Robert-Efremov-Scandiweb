import React, { Component } from 'react'
import "./MiniCart.css"

export default class MiniCart extends Component {
    render() {
        return (
            <>
            <div className='header-minicart' id='minicart'>
                <div className='mc-title'>My Bag, {this.props.items} items</div>
                <div className='mc-products'>
                    <div className='mc-card'></div>
                    <div className='mc-card'></div>
                </div>
                <div className='mc-buttons'>
                    <h1 className='mc-total'>Total</h1>
                    <h1 className='mc-value'>${this.props.value}</h1>
                    <div className='view-bag'>VIEW BAG</div>
                    <div className='mc-checkout'>CHECKOUT</div>
                </div>
            </div>
          
            </>
        )
    }
}
