import React, { Component } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { GET_ONE_PRODUCT } from "../api"
import { Query } from 'react-apollo'
import "./PDP.css"

class PDP extends Component {
constructor(props) {
  super(props);
  this.state = {
    aImage: ""
  }
}
render() {
    const id = this.props.params.id;
    
    return (
      <Query query={GET_ONE_PRODUCT} variables={{ id: id }}>
        {
          ({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error: {error}</div>
            const firstImg = data.product.gallery[0]
            return (
              <div className='pdp-main'>
                <div className='pdp-gallery'>
                  {data.product.gallery.map((item) => 
                  <img src={item} className='gallery-image' onLoad={() => this.setState({aImage: this.state.aImage = firstImg})} onClick={() => this.setState({ aImage: this.state.aImage = item })}></img>)}
                  </div>
                <img className='pdp-picture' src={ this.state.aImage}></img>
                <div className='pdp-details'></div>
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
    return (
      <>
        <PDP {...props} params={params} />
      </>
    )
  }
}
export default withHook(PDP);
