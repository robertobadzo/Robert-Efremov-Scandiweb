import React, { Component, useEffect } from 'react'
import "./ProductListPage.css";
import { GET_PRODUCTS } from '../api/index.js'
import { Query } from 'react-apollo'
import { useSelector, useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import "./ProductListPage.css"
import { useLocation, withRouter } from "react-router"
import PropTypes from "prop-types";


class ProductListPage extends Component {
  
 
  render() {
    return (
      
      <Query query={GET_PRODUCTS}>
        {
          ({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            const checkLocation = () => {
              const location = window.location.pathname;
              this.props.dispatch({ type: location.substring(1) })
            }
            checkLocation()
            window.onpopstate = checkLocation; 
           
            const arr = Object.values(data)
            const hook = this.props.hook;
            
            const result = arr.filter((el) => el.category == hook);
            
            if (hook === "all" ) return  <div><ul>{arr.map(item => <NavLink className="remove-styling" to={`/description/${item.id}`} key={item.id}><ol key={item.id}>{item.name}</ol></NavLink>)}</ul>   </div>
           return (
           <div>
              <div>{result.map(item => <NavLink className="remove-styling" to={`/description/${item.id}`} key={item.id} onClick={()=> this.props.dispatch({ type: item.id })}><div key={item.id}>{item.id}</div></NavLink>)}</div>
              </div> )
           
          }
        }
      </Query>
    )
  }
}
const withHook = (ProductListPage) => {
  return function WrappedComponent(props) {
    const hook = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    return (
      <>
        <ProductListPage {...props} hook={hook} dispatch = {dispatch} />
      </>
    )
  }
}

export default withHook(ProductListPage);