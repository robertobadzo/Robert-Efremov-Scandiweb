import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES } from '../api'
import './Header.css'
import logo from "../util/a-logo.svg"
import cart from "../util/cart.svg"
import arrow from "../util/dropdown-arrow.svg"

export class Header extends Component {
  render() {
    const toggleMiniCart = () => {
     const mcart =  document.getElementById("minicart")
    if ( mcart.classList.contains("visible")) return mcart.classList.remove("visible")
    else return mcart.classList.add("visible")

    }
    return (
      <div className='wrapper'>
        <Query query={GET_CATEGORIES}> 
          {
            ({ data, loading, error }) => {
             
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error: {error}</div>
              return (
                <>
                
                  {/*LEFT SECTION */}
                  <ul className='header-left'>
                    {data.categories.map(item => <NavLink className="remove-styling"
                      onClick={() => this.props.dispatch({ type: item.name })} to={item.name} key={item.name} a><ol className="header-category" key={item.name} >{item.name.toUpperCase()}</ol></NavLink>)}
                  </ul>

                  {/*MIDDLE SECTION */}
                  <div className='header-middle'>
                    <img className="header-logo" src={logo}></img>
                  </div>

                  {/*RIGHT SECTION */}
                  <div className='header-right'>
                    <div className='header-price'> <h1 className='header-currency'>$</h1>
                      <img className="header-arrow" src={arrow}></img>
                    </div>
                    <div onClick={toggleMiniCart}>
                      <img className="header-cart" src={cart}></img>
                    </div>
                    <div className='header-minicart' id='minicart' data-visible="visible"></div>
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
    return (
      <>
        <Header {...props} dispatch={dispatch} />
      </>
    )
  }
}
export default withHook(Header);