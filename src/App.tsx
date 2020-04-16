import React from 'react'
import styled from 'styled-components'
import { Link, Router, RouteComponentProps, LinkProps } from '@reach/router'

import logo from './logo.png'
import './App.css'
import EditPrice from 'views/EditPrice'
import ViewPrice from './views/ViewPrice'

const StyledHeader = styled.header`
display: flex;
align-items: center;
padding: 20px;
`

const StyledNav = styled.nav`
display: flex;
flex: 1 1 auto;
justify-content: center;

a {
  padding: 10px 15px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  margin: 5px;
}

a, a:visited {
  color: #BCB5A3;
  border: 2px solid #BCB5A3;
  background: transparent;
}

a.active {
  color: #FFF6C9;
  background: #F49809;
  border: none;
}
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
        <EditPrice path="/price/me" />
        <ViewPrice path="/price/me/:year/:week" />
        <Home path="/" />
      </Router>
    </div>
  )
}

export default App
