import React, { Component } from 'react'
import { NavLink, BrowserRouter as Router } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { Query } from 'react-apollo'
import { GET_CATEGORIES } from '../api'
import './Header.css'
import logo from "../util/a-logo.svg"
import cart from "../util/cart.svg"
import arrow from "../util/dropdown-arrow.svg"


export class Header extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Query query={GET_CATEGORIES} >
          {
            ({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error: {error}</div>
              console.log(data.categories)
              return (
                <>
                  <ul className='header-left'>
                    {data.categories.map(item => <NavLink onClick={()=> this.props.dispatch({ type: item.name })} to={item.name} className="header-navlink" key={item.name}><ol key={item.name} className='header-category'>{item.name.toUpperCase()}</ol></NavLink>)}
                  </ul>
                  <div className='header-middle'>
                    <img className="header-logo" src={logo}></img>
                  </div>
                  <div className='header-right'>
                    <div className='header-price'> <h1 className='header-currency'>$</h1>
                      <img className="header-arrow" src={arrow}></img>
                    </div>
                    <NavLink to="/cart">
                      <img className="header-cart" src={cart}></img>
                    </NavLink>
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

const withHook = (Header) =>  {
  return function WrappedComponent(props) {
      const dispatch = useDispatch({type:"clothes"});
      return (
      <>
      <Header {...props} dispatch = {dispatch} />
      </>
      )
  }
}
export default withHook (Header);