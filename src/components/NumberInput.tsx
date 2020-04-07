// Stolen from https://codesandbox.io/s/strongly-typed-form-values-with-react-final-form-26jkd

import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<number, HTMLInputElement>

function NumberInput(Component?: React.FC<any>): React.FC<any> | "input" {
  return (props: Props) => {
    const { input, meta, ...rest } = props;
    if (Component !== undefined) {
      return <Component {...input} {...rest} type="number" />
    }
    return <input {...input} {...rest} type="number"/>
  }
}

export default NumberInput;
