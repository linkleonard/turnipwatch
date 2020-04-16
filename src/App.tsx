import React from 'react'
import styled from 'styled-components'
import { Router, RouteComponentProps } from '@reach/router'

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
