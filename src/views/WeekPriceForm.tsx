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
grid-area: ${({ index }) => {
    const day = Math.floor(index / 2)
    const timeOfDay = index % 2 === 0 ? "a" : "p"
    return `d${day}${timeOfDay}`
  }};
`

const BuyPriceLabel = styled.label`
grid-area: bl;
`

const BuyPriceInput = styled.input`
grid-area: bp;
`

const StyledForm = styled.form`
display: grid;
grid-gap: 10px;
padding: 10px;
margin: auto;
justify-items: center;
align-items: center;

${FormInput}, ${BuyPriceInput} {
  width: calc(100% - 20px);
  padding: 10px;
  text-align: center;
}

${BuyPriceLabel} {
  text-align: center;
}

@media only screen and (min-width: 800px) {
  max-width: 600px;
  grid-template-columns: 50px repeat(6, 1fr);
  grid-template-rows: 1fr 50px repeat(4, 1fr);
  grid-template-areas:
    ".  .   .   bl  bl  .   ."	
    ".  .   .   bp  bp  .   ."	
    ".  d0  d1  d2  d3  d4  d5"
    "am d0a d1a d2a d3a d4a d5a"
    "pm d0p d1p d2p d3p d4p d5p"
    ".  .   .   s   s   .   .";

  ${BuyPriceInput} {
    width: calc(60% - 20px);
    align-self: start;
  }
}

@media only screen and (max-width: 799px) {
  max-width: 350px;
  grid-template-columns: 100px repeat(2, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "bl bp  bp"
    ".  am  pm"
    "d0 d0a d0p"
    "d1 d1a d1p"
    "d2 d2a d2p"
    "d3 d3a d3p"
    "d4 d4a d4p"
    "d5 d5a d5p"
    "s  s   s";
  
  ${DayLabel}, ${BuyPriceLabel} {
    place-self: center end;
    padding-right: 10px;
  }
}
`

type UserInput = string | null

export interface FormValues {
  buyPrice: UserInput,
  // fields for each price entry, i.e. price-0
  [key: string]: UserInput,
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
      .mapValues(v => (v !== null) ? parseInt(v, 10) : null)
      .value()

  const prices = Array.from(new Array(submittableDays.length * 2)).map((v, k) => rawPrices[k])
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
const BuyPriceInputComponent = NumberInput(BuyPriceInput)
const InputComponent = NumberInput(FormInput)
const Component = (props: Props) => (
  <Form
    onSubmit={(v: FormValues) => props.onSubmit(transformValues(v))}
    render={({ handleSubmit }) => (
      <StyledForm onSubmit={handleSubmit}>
        <BuyPriceLabel htmlFor="buyPrice">Buy Price</BuyPriceLabel>
        <Field
          name="buyPrice"
          initialValue={props.priceRecord.buyPrice ?? undefined}
          component={BuyPriceInputComponent}
        />
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
            key={index}
            index={index}
            aria-label={time}
            initialValue={props.priceRecord.prices[index]}
          />
        ))}
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    )}
  />
)

export default Component
