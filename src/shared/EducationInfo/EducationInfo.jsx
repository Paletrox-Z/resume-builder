import React from 'react'
import { Col, Row, Card, Accordion, Button } from 'react-bootstrap'
import { store, view } from 'react-easy-state'
import { Form } from 'formik'
import { ControlCreator, getCountryWiseStatesList } from 'src/utils'
import { RenderForm } from 'src/shared'
import fieldsCollection, { validationSchema } from './FieldData'
import './styles.scss'

class EducationInfoWrapper extends React.Component {
  data = store({})
  constructor(props) {
    super(props)
    this.data.formData = {}
    this.data.StatesList = getCountryWiseStatesList['India']
    fieldsCollection.map((fieldData) => {
      const { name = '' } = fieldData
      this.data.formData[name] = ''
    })
  }
  handleSubmit = (data) => {
    const { componentId, updateResumeData, educationId } = this.props
    this.data.formData = data
    updateResumeData(componentId, this.data.formData, educationId)
  }
  renderControlWithMods = (controlData) => {
    const { errors, touched, handleChange, controlProps } = controlData
    const { name = '', required = true } = controlProps
    const modifiedProps = { handleChange }
    if (['eduState', 'eduCountry'].includes(name)) {
      modifiedProps.eduCountry = handleChange
      modifiedProps.options =
        name === 'eduCountry'
          ? ['Select Country', ...Object.keys(getCountryWiseStatesList)]
          : name === 'eduState'
          ? ['Select State', ...this.data.StatesList]
          : []
      modifiedProps.selectedText =
        this.data.formData[name] || modifiedProps.options[0]
      modifiedProps.handleSelect = this.handleSelect
    }
    return (
      <ControlCreator
        parentClassName={`d-flex flex-wrap justify-items-center px-2`}
        labelClassName='rb-field-label'
        required={required}
        errors={errors}
        touched={touched}
        {...controlProps}
        {...modifiedProps}
      />
    )
  }
  render() {
    const { removeEducation, educationId } = this.props
    return (
      <React.Fragment>
        <RenderForm
          initialValues={this.data.formData}
          validationSchema={validationSchema}
          handleSubmit={this.handleSubmit}>
          {({ errors, touched, handleChange }) => (
            <Form className='d-flex flex-wrap justify-content-start align-items-center w-100'>
              <Row noGutters className='edu-id-label w-100 my-1'>
                Education ID: {educationId}
              </Row>
              <Row noGutters className='w-100'>
                {fieldsCollection.map((controlProps) =>
                  this.renderControlWithMods({
                    controlProps,
                    errors,
                    touched,
                    handleChange,
                  })
                )}
              </Row>
              <Row noGutters className='d-flex justify-content-around w-100'>
                <Button className='btn-dark submit-button mx-1' type='submit'>
                  Save
                </Button>
              </Row>
            </Form>
          )}
        </RenderForm>
        <Row noGutters className='d-flex justify-content-around w-100'>
          <Button
            className='btn-dark submit-button mx-1'
            type='button'
            onClick={() => removeEducation(educationId)}>
            Delete Experience
          </Button>
        </Row>
      </React.Fragment>
    )
  }
}

const EducationInfo = view(EducationInfoWrapper)

export default EducationInfo
export { EducationInfo }
