import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

const FloatContainer = styled.div`
position: relative;
`

const FloatNav = styled.ul`
position: absolute;
z-index: 1;
padding: 0;
left: 0;
top: 100%;
right: auto;
width: max-content;

margin: 0;
display: none;
list-style: none;

&.active {
  display: grid;
  grid-rows: auto;
  grid-columns: 1fr;
}

a {
  display: block;
}
`

interface DropdownProps {
  button: (p: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element,
  children: any,
}
export default class Dropdown extends React.Component<DropdownProps> {
  state: {
    active: boolean
  }
  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    const toggleActive = () => {
      this.setState({ active: !this.state.active })
    }
    return (
      <FloatContainer>
        {this.props.button({
          onClick: toggleActive,
          "aria-haspopup": "true",
          "aria-expanded": this.state.active,
        })}
        <FloatNav className={`${this.state.active ? "active" : ""}`}>
          {this.props.children}
        </FloatNav>
      </FloatContainer>
    )
  }
}
