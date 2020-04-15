import React from 'react'
import _ from 'lodash'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import NumberInput from 'components/NumberInput'
import { MaybePrice, IPriceRecord } from 'models'
import { daysOfWeek } from 'utils/time'

const SubmitButton = styled.button`
grid-area: s;
align-self: center;
justify-self: center;
`

enum TimeOfDay {
  am = "am",
  pm = "pm",
}

const TimeLabel = styled.div<{ time: TimeOfDay }>`
text-transform: uppercase;
grid-area: ${props => `${props.time}`};
`

const DayLabel = styled.div<{ index: number }>`
grid-area: ${props => `d${props.index}`};
`

const FormInput = styled.input<{ index: number }>`
padding: 10px;
width: calc(100% - 20px);
text-align: center;
grid-area: ${({ index }) => {
    const day = Math.floor(index / 2)
    const timeOfDay = index % 2 === 0 ? "a" : "p"
    return `d${day}${timeOfDay}`
  }};
`

const StyledForm = styled.form`
display: grid;
grid-gap: 10px;
padding: 10px;
margin: auto;
justify-items: center;
align-items: center;

@media only screen and (min-width: 800px) {
  max-width: 600px;
  grid-template-columns: 50px repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    ".  d0  d1  d2  d3  d4  d5"
    "am d0a d1a d2a d3a d4a d5a"
    "pm d0p d1p d2p d3p d4p d5p"
    ".  .   .   s   s   s   .";
}

@media only screen and (max-width: 799px) {
  max-width: 350px;
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
    "s  s   s";
  
  ${DayLabel} {
    place-self: center end;
    padding-right: 10px;
  }
}
`

export interface FormValues {
  buyPrice: string,
  [key: string]: string
}

export function transformValues(values: FormValues): IPriceRecord {
  const pricePrefix = "price-"
  const { ...props } = values
  const buyPrice = (values.buyPrice !== null) ? (parseInt(values.buyPrice, 10) ?? null) : null
  const rawPrices =
    _.chain(props)
      .pickBy((v, k) => k.startsWith(pricePrefix))
      .mapKeys((v, k) => parseInt(k.slice(pricePrefix.length), 10))
      .pickBy((v): v is string => v !== undefined)
      .mapValues(v => parseInt(v, 10))
      .value()

  const prices = Array.from(new Array(14)).map((v, k) => rawPrices[k])
  return {
    buyPrice,
    prices,
  }
}

interface Props {
  onSubmit: (v: IPriceRecord) => any,
  priceRecord: IPriceRecord,
}

function isNotDefined<T>(v: T | undefined): v is T {
  return v !== undefined
}

const timeOfDay = [TimeOfDay.am, TimeOfDay.pm]

const submittableDays = daysOfWeek.slice(1)
const am = submittableDays.map(d => `${d} AM`)
const pm = submittableDays.map(d => `${d} PM`)
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
    onSubmit={(v: FormValues) => props.onSubmit(transformValues(v))}
    render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        {timeOfDay.map((time) => (
          <TimeLabel key={time} time={time}>{time}</TimeLabel>
        ))}
        {submittableDays.map((day, index) => (
          <DayLabel key={index} index={index}>{day.slice(0, 3)}</DayLabel>
        ))}
        {times.map((time, index) => (
          <Field
            name={`price-${index}`}
            component={InputComponent}
            key={index} index={index} aria-label={time}
            initialValue={props.priceRecord.prices[index]}
          />
        ))}
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    )}
  />
)

export default Component
