export type IValidator = {
  type: any,
  validate: (v: any) => boolean
}

export const NullValidator: IValidator = {
  type: null,
  validate(v: any): v is null {
    return v === null
  }
}

export const NumberValidator: IValidator = {
  type: "number",
  validate(v: any): v is number {
    return !(Number.isNaN(Number(v)))
  }
}

export class CompoundValidator<T> implements IValidator {
  type: any
  validators: IValidator[]
  constructor(validators: IValidator[]) {
    this.validators = validators
    this.type = validators.map(v => v.type).join(" | ")
  }

  validate(v: any): v is T {
    return this.validators.find(child => child.validate(v)) !== undefined
  }
}

export const NullableNumberValidator: IValidator = new CompoundValidator<null | number>([
  NullValidator,
  NumberValidator,
])
