import React from 'react'
import {Field} from 'formik'
import {FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap'

export type FormTextFieldProps = {
  name: String
  id: String
  label: React.ReactNode
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  rows?: string
  helperText?: React.ReactNode
  className?: any
  type?: string
  required?: boolean
  value?: string | number
  onKeyDown?: (event: any) => void
  onKeyUp?: (event: any) => void
  disabled?: boolean
  icon?: React.ReactNode
  inputProps?: any
  sizeAdjustable?: boolean
  InputProps?: any
  maxLength?: string | number
  pattern?: string
  min?: string | number
  isRequiredField?: boolean
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  id,
  label,
  disabled = false,
  helperText,
  isRequiredField,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({field, meta}:any) => (
        <FormGroup>
          <Label htmlFor={'name'} className="block text-sm font-medium leading-6 text-gray-900">
            {label} {isRequiredField && <span style={{color: 'red'}}>*</span>}
          </Label>
          <div className="mt-2">
            <Input
              disabled={disabled}
              {...field}
              {...rest}
              autoComplete={'off'}
              invalid={meta.touched && !!meta.error}
              className="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            />
            <FormFeedback className='text-red-500 text-sm'>{meta.touched && meta.error}</FormFeedback>
            <FormText>{helperText}</FormText>
          </div>
        </FormGroup>
      )}
    </Field>
  )
}

export default FormTextField
