import React from 'react';
import './App.css';

import Layout from './pages/Layout'

import Home from './pages/Home'
import Search from './pages/Search'
// import Product from './pages/Product'

import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path="/" exact component={ Home } />
          <Route path="/items" component={ Search } />
          {/* <Route path="/items/:id" component={ Product } /> */}
        </Layout>
      </Router>
    );
  }
}

export default App;
