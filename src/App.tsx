import React from 'react';
import { Link, Router, RouteComponentProps } from '@reach/router'

import logo from './logo.png';
import './App.css';
import Form from './PriceForm';
import PriceHistoryGraph from './PriceHistoryGraph'

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />      
      <Nav />
    </header>
  )
}

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/price/add">Add Price</Link>
      <Link to="/price/me">My Prices</Link>
    </nav>
  )
}

function Home(props: RouteComponentProps) {
  return <div />
}

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Form path="/price/add" />
        <PriceHistoryGraph path="/price/me" />
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
