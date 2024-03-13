import React from 'react'
import FormTextField, { FormTextFieldProps } from '../TextField'

export type NumberFieldProps = {
  min: Number
  max: Number
}

type FormNumberFieldProps = FormTextFieldProps & NumberFieldProps

const FormNumber: React.FC<FormNumberFieldProps> = (props) => {
  const onKeyDownHandler = (event: any) => {
    const charactorASCII = event.which || event.keyCode
    const isDecimal = charactorASCII === 190
    const isBackSpace = charactorASCII === 8
    const isArrows = charactorASCII >= 37 && charactorASCII <= 37
    const isComma = charactorASCII === 188
    const isNumbers = charactorASCII >= 48 && charactorASCII <= 57

    if (
      event.shiftKey ||
      !(
        event.ctrlKey ||
        isNumbers ||
        isBackSpace ||
        isArrows ||
        isComma ||
        isDecimal
      )
    )
      event.preventDefault()
  }

  return (
    <FormTextField
      onKeyDown={onKeyDownHandler}
      {...props}
      type={'number'}
    />
  )
}

export default FormNumber
