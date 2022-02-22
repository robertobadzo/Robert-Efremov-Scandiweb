import React, { Component, } from 'react'
import "./ProductListPage.css";
import { GET_PRODUCTS } from '../api/index.js'
import { Query } from 'react-apollo'
import { useSelector } from "react-redux";


class ProductListPage extends Component {

  render() {


    return (
      <Query query={GET_PRODUCTS}>
        {
          ({ data, previousData, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            if (this.props.hook && this.props.hook != "@@redux/INITw.s.l.f.g.o") return <div>{this.props.hook}</div>
            const keys = Object.keys(data)
            return (
              <div>
                  <div>all</div>
              </div>
              )
          }
        }
      </Query>
    )
  }
}
const withHook = (ProductListPage) => {
  return function WrappedComponent(props) {
    const hook = useSelector(state => state.categoryReducer);
    return (
      <>
        <ProductListPage {...props} hook={hook} />
      </>
    )
  }
}
export default withHook(ProductListPage);