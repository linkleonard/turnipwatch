// Stolen from https://codesandbox.io/s/strongly-typed-form-values-with-react-final-form-26jkd

import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<number, any>;

const NumberInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <input {...input} {...rest} type="number" />
);

export default NumberInput;
