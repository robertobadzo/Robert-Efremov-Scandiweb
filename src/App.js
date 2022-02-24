import ProductListPage from './components/ProductListPage.js';
import React, { Component } from 'react';
import Header from './components/Header.js';
import { NavLink, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import { connect } from "react-redux";
import Cart from "./components/Cart"
import PDP from './components/PDP.js';

export class App extends Component {
  
  render() {
    return (
      <div className='global-wrapper'>
        <Router>
        <Header></Header>
          
          <Routes>
        
            <Route path='/:category' element={<ProductListPage />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/description/:id' element={<PDP />} exact></Route>
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
