import ProductListPage from './components/ProductListPage.js';
import React, { Component } from 'react';
import Header from './components/Header.js';
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import './App.css';

import Cart from "./components/Cart"
import PDP from './components/PDP.js';

export class App extends Component {

  render() {
    return (
      <div className='global-wrapper'>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path = "/" element={<Navigate to = "all"/>}></Route>
            <Route path='/:category' element={<ProductListPage />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/description/:id' element={<PDP />} exact></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
