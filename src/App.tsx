import React from 'react';
import styled from 'styled-components'
import { Link, Router, RouteComponentProps } from '@reach/router'

import logo from './logo.png';
import './App.css';
import AddPrice from './AddPrice';
import ViewPrice from './ViewPrice'

const StyledHeader = styled.header`
display: flex;
align-items: center;
`

const StyledNav = styled.nav`
display: flex;
flex: 1 1 auto;
justify-content: space-around;
`

const StyledImg = styled.img`
object-fit: contain;
max-height: 100px;
`

function Header() {
  return (
    <StyledHeader>
      <StyledImg src={logo} alt="logo" />      
      <Nav />
    </StyledHeader>
  )
}

function Nav() {
  return (
    <StyledNav>
      <Link to="/">Home</Link>
      <Link to="/price/add">Add Price</Link>
      <Link to="/price/me">My Prices</Link>
    </StyledNav>
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
        <AddPrice path="/price/add" />
        <ViewPrice path="/price/me" />
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
