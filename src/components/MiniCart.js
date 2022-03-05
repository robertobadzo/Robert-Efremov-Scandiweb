import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
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
                   <NavLink to="/cart" className='remove-styling view-bag'> <div>VIEW BAG</div> </NavLink>
                    <div className='mc-checkout'>CHECKOUT</div>
                </div>
            </div>
          
            </>
        )
    }
}
