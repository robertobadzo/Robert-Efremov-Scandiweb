import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

class PDP extends Component {
  render() {
    return (
      <div>{this.props.params.id}</div>
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