import _ from 'lodash'
import styled from 'styled-components'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Link } from '@reach/router'
import { RootState } from 'redux/reducers'
import { useSelector } from 'react-redux'

// Only show this number of dates on the navbar.
const MAX_NAV_DATES = 6

const NavFloatContainer = styled.div`
position: relative;
`

const StyledNav = styled.nav`
display: flex;
flex: 1 1 auto;
justify-content: center;

button, a {
  font-family: Arial;
  font-size: 15px;
  display: inline-block;
  padding: 10px 15px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  margin: 5px;
  border: 2px solid transparent;
}

button, a, a:visited {
  color: #BCB5A3;
  border: 2px solid #BCB5A3;
  background: transparent;
}

a.active {
  color: #FFF6C9;
  background: #F49809;
  border: 2px solid transparent;
}
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

function formatWeekDiff(start: Dayjs, now: Dayjs): string {
  const weekDiff = Math.ceil(start.diff(now, 'week'))

  if (weekDiff == 0) {
    return 'This week'
  }
  if (weekDiff == 1) {
    return 'Last week'
  }
  if (weekDiff < 5) {
    return `${weekDiff} weeks ago`
  }
  return start.format("YYYY-MM-DD")
}

const PriceListNav = (props: React.HTMLAttributes<HTMLElement>) => {
  const pricesByWeek = useSelector((state: RootState) => state.weeklyPrices.prices)
  const sorted =
    _.chain(pricesByWeek)
      .values()
      .sortBy(['year', 'week'])
      .reverse()
      // Arbitrary.
      .slice(0, MAX_NAV_DATES)
      .value()

  const now = dayjs()
  return (
    <FloatNav {...props}>
      {sorted.map(r => {
        const start = dayjs().isoWeek(r.week).year(r.year)

        return (
          <li key={start.valueOf()}>
            <NavLink to={`/price/me/${r.year}/${r.week}`}>
              {formatWeekDiff(start, now)}
            </NavLink>
          </li>
        )
      })}
    </FloatNav>
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

class Nav extends React.Component {
  state: {
    active: boolean
  }
  constructor(props: any) {
    super(props)
    this.state = {
      active: false
    }
  }

  render() {
    return (
      <StyledNav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/price/me">My Prices</NavLink>
        <NavFloatContainer>
          <button
            onClick={() => this.setState({ active: !this.state.active })}
            aria-haspopup="true" aria-controls="price-list-nav" aria-expanded="true"
          >
            Past Prices
            </button>
          <PriceListNav id="price-list-nav" className={`${this.state.active ? "active" : ""}`} />
        </NavFloatContainer>
      </StyledNav>
    )
  }

}

export default Nav
