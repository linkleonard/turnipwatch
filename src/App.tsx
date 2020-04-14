import React from 'react';
import styled from 'styled-components'
import { Link, Router, RouteComponentProps, LinkProps } from '@reach/router'

import logo from './logo.png';
import './App.css';
import ViewPrice from 'views/ViewPrice'

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
max-width: 10vw;
`

function Header() {
  return (
    <StyledHeader>
      <StyledImg src={logo} alt="logo" />      
      <Nav />
    </StyledHeader>
  )
}

const NavLink = (props: any) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? "active" : "",
    })}
  />
  
)

function Nav() {
  return (
    <StyledNav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/price/me">My Prices</NavLink>
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
        <ViewPrice path="/price/me" />
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
