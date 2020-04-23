import React from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route,
} from "react-router-dom"

import logo from './logo.png'
import './App.css'
import EditPrice from 'views/EditPrice'
import ViewPrice from './views/ViewPrice'
import Nav from './views/Nav'

const StyledHeader = styled.header`
display: flex;
align-items: center;
padding: 20px;
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

function Home() {
  return <div />
}

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/price/me" component={EditPrice} exact />
        <Route path="/price/me/:year/:week" component={ViewPrice} />
      </Switch>
    </div>
  )
}

export default App
