import ProductListPage from './components/ProductListPage.js';
import React, { Component } from 'react';
import Header from './components/Header.js';
import { NavLink, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import { connect } from "react-redux";

export class App extends Component {
  
  render() {
    return (
      <div className='global-wrapper'>
        <Router>
        <Header></Header>
        <ProductListPage />
          <Routes>
          </Routes>
          <div>{this.props.category}</div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (categoryReducer) => {
   
  return { 
    category: categoryReducer='5'
    
   };
 
};
export default connect(mapStateToProps)(App)
