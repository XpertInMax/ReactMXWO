import React, { FunctionComponent } from "react"
import { Field } from "formik"
import { noop } from "lodash"
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap'

export type FormRadioProps = {
  name: String
  id: String
  value: String
  label: React.ReactNode
  options: any
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  rows?: string
  isRequiredField?: boolean,
  helperText?: React.ReactNode
  required?: boolean
  disabled?: boolean
  onChangeHandler?: (checked: boolean) => void
}

const FormRadio: FunctionComponent<FormRadioProps> = ({
  name,
  label,
  onChangeHandler = noop,
  disabled,
  isRequiredField,
  helperText,
  options,
  value,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field: { value, ...field }, form: { setFieldValue }, meta }: any) => {
        const handleChange = (event: any) => {
          setFieldValue(name, event.target.name)
          onChangeHandler && onChangeHandler(event.target.name)
        }
        
        return (
          <FormGroup tag="fieldset">
            <Label for={'radio'} className="block text-sm font-medium leading-6 text-gray-900">
              {label}{' '}
              {isRequiredField && <span style={{ color: 'red' }}>*</span>}
            </Label>
            <div className="flex justify-left align-left gap-10 w-full">
              <FormGroup>
                <Input  type="radio" name="yes" checked={value=='yes' ? true : false} onChange={handleChange} />
                {' '}
                <Label>Yes</Label>
              </FormGroup>
              <FormGroup>
                <Input type="radio" name="no" checked={value=='no' ? true : false} onChange={handleChange} />
                {' '}
                <Label>No</Label>
              </FormGroup>
            </div>
            <FormFeedback className='text-red-500 text-sm'>{meta.touched && meta.error}</FormFeedback>
            <FormText>{helperText}</FormText>
          </FormGroup>
        )
      }}
    </Field>
  )
}

export default FormRadio
