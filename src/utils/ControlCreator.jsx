import React from 'react'
import { store, view } from 'react-easy-state'
import { FormGroup, Form, FormLabel, Dropdown } from 'react-bootstrap'
import { Field } from 'formik'

const textTypes = ['text', 'number', 'email', 'tel']

class ControlCreatorWrapper extends React.Component {
  data = store({})
  constructor(props) {
    super(props)
    const optionsList = this.props.optionsList || []
    this.data.selectedDropdownValue =
      (optionsList.length > 0 && optionsList[0]) || ''
  }

  /*
   *  Default Event Handlers
   */

  dummyEvenHandler = (event) => {
    console.log('**** Dummy function triggered!')
  }

  /*
   *  Render operations
   */

  renderErrorMessageBlock = (errors, componentId) => {
    return (
      <div className='cc-error-block alert-danger'>{errors[componentId]}</div>
    )
  }

  renderTextField() {
    const {
      label = '',
      id = '',
      name = '',
      type = '',
      disabled = false,
      maxLength = 20,
      required = false,
      parentClassName = '',
      labelClassName = '',
      className = '',
      customId = '',
      handleChange = this.dummyEvenHandler,
      errors,
      touched,
      selectedText = '',
      ...extraProps
    } = this.props
    return (
      <FormGroup
        className={`cc-control-group ${parentClassName}`}
        key={`${customId}-${id}-parent`}>
        <FormLabel
          className={`cc-control-label w-100 ${labelClassName}`}
          key={`${customId}-${id}-label`}>
          {label}
        </FormLabel>
        <Field
          name={name}
          id={id}
          type={type}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          className={`cc-control-input w-100 ${className}`}
          key={`${customId}-${id}-field`}
          {...extraProps}
        />
        {errors[id] && touched[id]
          ? this.renderErrorMessageBlock(errors, id)
        : null}
      </FormGroup>
    )
  }

  renderComboBox() {
    const {
      name = '',
      id = '',
      type = '',
      label = '',
      disabled = false,
      parentClassName = '',
      labelClassName = '',
      className = '',
      handleSelect = this.dummyEvenHandler,
      options = [],
      customId = '',
      errors,
      selectedText = '',
      touched,
    } = this.props
    if (options.length === 0) {
      return null
    }
    return (
      <FormGroup
        className={`cc-dropdown-parent ${parentClassName}`}
        key={`${customId}-${id}-parent`}>
        <FormLabel
          className={`cc-dropdown-toggle w-100 ${labelClassName}`}
          key={`${customId}-${id}-toggle`}>
          {label}
        </FormLabel>
        <Field
          as='select'
          name={name}
          className={`cc-dropdown-field align-items-center btn-dark w-100 ${className}`}
          key={`${customId}-${id}-parent`}
          onSelect={handleSelect}
          disabled={disabled}>
          {options.map((optionItem) => {
            if (optionItem) {
              return (
                <option
                  className={`cc-dropdown-item w-100`}
                  value={optionItem.toLowerCase().replaceAll(' ', '')}
                  key={`${customId}-${id}-${optionItem}`}>
                  {optionItem}
                </option>
              )
            }
          })}
        </Field>
        {errors[id] && touched[id]
          ? this.renderErrorMessageBlock(errors, id)
          : null}
      </FormGroup>
    )
  }

  renderCheckBox = () => {
    const {
      name = '',
      id = '',
      type = '',
      disabled = false,
      required = false,
      parentClassName = '',
      labelClassName = '',
      className = '',
      customId = '',
      selectedText = '',
      onClick = this.dummyEvenHandler,
      ...extraProps
    } = this.props
    return (
      <FormGroup
        className={`cc-control-group ${parentClassName}`}
        key={`${customId}-${id}`}>
        <Form.Check
          className={`cc-control-input ${className}`}
          type={type}
          label={name}
          onClick={onClick}
          disabled={disabled}
          {...extraProps}
        />
      </FormGroup>
    )
  }

  render() {
    const { type = '' } = this.props
    if (textTypes.includes(type)) return this.renderTextField()
    else if (type.toLowerCase() === 'dropdown') return this.renderComboBox()
    else if (type.toLowerCase() === 'checkbox') return this.renderCheckBox()
    else return null
  }
}

const ControlCreator = view(ControlCreatorWrapper)

export default ControlCreator
export { ControlCreator }
