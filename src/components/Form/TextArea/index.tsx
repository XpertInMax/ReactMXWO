import React from 'react'
import {Field} from 'formik'
import {FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap'

export type FormTextAreaProps = {
  name?: string
  id?: string
  label?: React.ReactNode
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  rows?: string
  helperText?: React.ReactNode
  className?: any
  type?: string
  required?: boolean
  defaultValue?: any
  disabled?: boolean
  changeHandler?: (value: any) => void
  isRequiredField?: boolean
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
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
          <Label for={id} className="block text-sm font-medium leading-6 text-gray-900">
            {label} {isRequiredField && <span style={{color: 'red'}}>*</span>}
          </Label>
          <Input
            type='textarea'
            disabled={disabled}
            {...field}
            {...rest}
            invalid={meta.touched && !!meta.error}
            className="block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          />
          <FormFeedback className='text-red-500 text-sm'>{meta.touched && meta.error}</FormFeedback>
          <FormText>{helperText}</FormText>
        </FormGroup>
        
      )}
    </Field>
  )
}

export default FormTextArea
