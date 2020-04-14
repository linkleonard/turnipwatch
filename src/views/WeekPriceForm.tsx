import React from 'react';
import _ from 'lodash'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import NumberInput from 'components/NumberInput';
import { daysOfWeek } from 'utils/time'

const SubmitButton = styled.button`
grid-column: 1 / -1;
`

enum TimeOfDay {
  am = "am",
  pm = "pm",
}

const TimeLabel = styled.div<{time: TimeOfDay}>`
text-transform: uppercase;
grid-area: ${props => `${props.time}`};
`

const DayLabel = styled.div<{index: number}>`
grid-area: ${props => `d${props.index}`};
`

const FormInput = styled.input<{index: number}>`
padding: 10px;
grid-area: ${({index}) => {
  const day = Math.floor(index / 2)
  const timeOfDay = index % 2 == 0 ? "a" : "p"
  return `d${day}${timeOfDay}`
}};
`

const StyledForm = styled.form`
display: grid;
grid-gap: 10px;
padding: 10px;
justify-items: center;
align-items: center;

@media only screen and (min-width: 800px) {
  grid-template-columns: 50px repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    ". d0 d1 d2 d3 d4 d5 d6"
    "am d0a d1a d2a d3a d4a d5a d6a"
    "pm d0p d1p d2p d3p d4p d5p d6p"
    "s  s   s   s   s   s   s   s"
}

@media only screen and (max-width: 799px) {
  grid-template-columns: 100px repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    ".  am  pm"
    "d0 d0a d0p"
    "d1 d1a d1p"
    "d2 d2a d2p"
    "d3 d3a d3p"
    "d4 d4a d4p"
    "d5 d5a d5p"
    "d6 d6a d6p"
    "s  s   s"
}
`

export interface FormResult {
  prices: Record<number, number | undefined>,
}

export interface FormValues {
  [key: string]: string
}

export function transformValues(values: FormValues): Record<number, number | undefined> {
  const pricePrefix = "price-"
  const { ...props } = values
  return (
    _.chain(props)
      .pickBy((v, k) => k.startsWith(pricePrefix))
      .mapKeys((v, k) => parseInt(k.slice(pricePrefix.length), 10))
      .pickBy((v): v is string => v !== undefined)
      .mapValues(v => parseInt(v, 10))
      .value()
  )
}

interface Props {
  onSubmit: (v: FormResult) => any
}

function isNotDefined<T>(v: T | undefined): v is T {
  return v !== undefined
}

const timeOfDay = [TimeOfDay.am, TimeOfDay.pm]

const am = daysOfWeek.map(d => `${d} AM`)
const pm = daysOfWeek.map(d => `${d} PM`)
const times: string[] = 
  _.chain(am)
    .zip(pm)
    .flatten()
    .filter(isNotDefined)
    .value()

// NumberInput returns a new instance everytime, so keep the FC around so the reconciliator doesn't get confused
const InputComponent = NumberInput(FormInput)
const Component = (props: Props) => (
  <Form
    onSubmit={(v: FormValues) => props.onSubmit({
      prices: transformValues(v)
    })}
    render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        {timeOfDay.map((time) => (
          <TimeLabel key={time} time={time}>{time}</TimeLabel>
        ))}
        {daysOfWeek.map((day, index) => (
          <DayLabel key={index} index={index}>{day.slice(0, 3)}</DayLabel>
        ))}
        {times.map((time, index) => (
          <Field
            name={`price-${index}`}
            component={InputComponent}
            key={index} index={index} aria-label={time}
          />
        ))}
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    )}
  />
);

export default Component;
