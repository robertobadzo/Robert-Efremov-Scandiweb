import React, { Component } from 'react'
import "./ProductListPage.css";

import { GET_PRODUCTS } from '../api/index.js'
import { Query } from 'react-apollo'



export default class ProductListPage extends Component {
  render() {
    return (

      <Query query={GET_PRODUCTS}>
        {
          ({ data, previousData, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            return (data.product1.name)
          }
        }
      </Query>

    )
  }
}
