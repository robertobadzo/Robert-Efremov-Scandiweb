import ProductListPage from './components/ProductListPage.js';
import React, { Component } from 'react';
import Header from './components/Header.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import './App.css';
import toggleMiniCart from './modules/toggle-minicart.js';
import Cart from "./components/Cart"
import PDP from './components/PDP.js';
import {clickOutside} from "./modules/clickOutside.js"
export class App extends Component {

  render() {
    
    //EVENT LISTENER TO CLOSE ON CLICK OUTSIDE THE POPUPS
    document.addEventListener("click", clickOutside);
    return (
      <div className='global-wrapper'>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Navigate to="all" />} exact ></Route>
            <Route path='/:category' element={<ProductListPage />} exact></Route>
            <Route path='/description/:id' element={<PDP />} exact></Route>
            <Route path='/cart' element={<Cart />} exact></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
