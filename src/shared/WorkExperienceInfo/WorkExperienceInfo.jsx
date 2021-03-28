import React from 'react'
import { Col, Row, Card, Accordion, Button } from 'react-bootstrap'
import { store, view } from 'react-easy-state'
import { Form } from 'formik'
import { ControlCreator, getCountryWiseStatesList } from 'src/utils'
import { RenderForm } from 'src/shared'
import fieldsCollection, { validationSchema } from './FieldData'
import './styles.scss'

class WorkExperienceInfoWrapper extends React.Component {
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
    const { componentId, updateResumeData, workExperienceId } = this.props
    this.data.formData = data
    updateResumeData(componentId, this.data.formData, workExperienceId)
  }
  renderControlWithMods = (controlData) => {
    const { errors, touched, handleChange, controlProps } = controlData
    const { name = '', required = true } = controlProps
    const modifiedProps = { handleChange }
    if (['wexState', 'wexCountry'].includes(name)) {
      modifiedProps.wexCountry = handleChange
      modifiedProps.options =
        name === 'wexCountry'
          ? ['Select Country', ...Object.keys(getCountryWiseStatesList)]
          : name === 'wexState'
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
    const { removeWorkExperience, workExperienceId } = this.props
    return (
      <React.Fragment>
        <RenderForm
          initialValues={this.data.formData}
          validationSchema={validationSchema}
          handleSubmit={this.handleSubmit}>
          {({ errors, touched, handleChange }) => (
            <Form className='d-flex flex-wrap justify-content-start align-items-center w-100'>
              <Row noGutters className='wex-id-label w-100 my-1'>
                Work Experience ID: {workExperienceId}
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
            onClick={() => removeWorkExperience(workExperienceId)}>
            Delete Experience
          </Button>
        </Row>
      </React.Fragment>
    )
  }
}

const WorkExperienceInfo = view(WorkExperienceInfoWrapper)

export default WorkExperienceInfo
export { WorkExperienceInfo }
