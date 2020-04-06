// Stolen from https://codesandbox.io/s/strongly-typed-form-values-with-react-final-form-26jkd

import React, { ReactNode } from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<number, any>

function NumberInput(Component?: React.FC<Props>): React.FC<Props> {
  if (Component !== undefined) {
    return Component
  }
  return ({ input, meta, ...rest }: Props) => (
    <input {...input} {...rest} type="number"/>
  )
}

export default NumberInput;
