import React from 'react'
import noop from 'lodash/noop'
import {Field, FieldProps} from 'formik'
import {FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap'

export type option = {
  label: string
  value: string | number
  disabled?: boolean
}

type FormSelectProps = {
  name: string
  id: string
  label: string
  options: option[]
  placeholder?: string
  fullWidth?: boolean
  helperText?: React.ReactNode
  multiple?: boolean
  className?: any
  required?: boolean
  value?: string | number
  onChangeHandler?: (id: string | number) => void
  disabled?: boolean
  style?: any
  isRequiredField?: boolean
}

export const defaultSelectProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizantal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizantal: 'left',
  },
  getContentAnchorEl: null,
  marginThreshold: 0,
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  options,
  disabled = false,
  onChangeHandler = noop,
  helperText,
  label,
  isRequiredField,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({field, meta, form}: FieldProps) => {
        const changeHandler = (event:any) => {
          const value = event?.target?.value || ''
          form.setFieldValue(name, value)
          onChangeHandler && onChangeHandler(value)
        }

        const renderOptions = (options:any) => {
          return options?.map((option:any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        }
        return (
          <FormGroup>
            {label && (
              <Label for={label} className="block text-sm font-medium leading-6 text-gray-900">
                {label}{' '}
                {isRequiredField && <span style={{color: 'red'}}>*</span>}
              </Label>
            )}
            <Input
              type='select'
              invalid={meta.touched && !!meta.error}
              disabled={disabled}
              {...rest}
              {...field}
              onChange={changeHandler}
              className="mt-2 block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            >
              <option value=''>Select</option>
              {renderOptions(options)}
            </Input>
            <FormFeedback className='text-red-500 sm:text-sm'>{meta.touched && meta.error}</FormFeedback>
            <FormText>{helperText}</FormText>
          </FormGroup>
        )
      }}
    </Field>
  )
}

export default FormSelect
