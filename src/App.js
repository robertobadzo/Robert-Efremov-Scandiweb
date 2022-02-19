import ProductListPage from './components/ProductListPage.js';
import React, { Component } from 'react';
import Header from './components/Header.js';
import { NavLink, BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className='global-wrapper'>
        <Router>
        <Header></Header>
          <Routes>
            <Route path="/all" element={<ProductListPage/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
export default App;
