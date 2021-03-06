import _ from 'lodash'
import styled from 'styled-components'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { NavLink } from 'react-router-dom'
import { RootState } from 'redux/reducers'
import { useSelector } from 'react-redux'
import Dropdown from 'components/Dropdown'

// Only show this number of dates on the navbar.
const MAX_NAV_DATES = 6

const NavButton = styled.button``

const StyledNav = styled.nav`
display: flex;
flex: 1 1 auto;
justify-content: center;

button, a {
  font-family: Arial;
  font-size: 15px;
  display: block;
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


${NavButton}:hover, a:hover {
  background: #ffbc55;
  border: 2px solid #fff6c9;
  color: #614f2d;
}

a.active {
  color: #FFF6C9;
  background: #F49809;
  border: 2px solid transparent;
}
`

function formatWeekDiff(start: Dayjs, now: Dayjs): string {
  const weekDiff = Math.ceil(start.diff(now, 'week'))

  if (weekDiff === 0) {
    return 'This week'
  }
  if (weekDiff === 1) {
    return 'Last week'
  }
  if (weekDiff < 5) {
    return `${weekDiff} weeks ago`
  }
  return start.format("YYYY-MM-DD")
}

export default function Nav() {
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
    <StyledNav>
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/price/me">My Prices</NavLink>
      <Dropdown
        button={props => <NavButton {...props}>Past Prices</NavButton>}
      >
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
      </Dropdown>
    </StyledNav>
  )
}
