import React from 'react'
import { Col, Row, Card, Accordion, Button } from 'react-bootstrap'
import { store, view } from 'react-easy-state'
import get from 'get-value'
import { Form } from 'formik'
import { ControlCreator, globalStateContainer } from 'src/utils'
import { RenderForm } from 'src/shared'
import fieldsCollection, { validationSchema } from './FieldData'
import './styles.scss'

class BasicInfoWrapper extends React.Component {
  data = store({})
  constructor(props) {
    super(props)
    this.data.formData = {}
    fieldsCollection.map((fieldData) => {
      const { name = '' } = fieldData
      this.data.formData[name] = ''
    })
  }
  handleSubmit = (data) => {
    const { componentId, updateResumeData } = this.props
    this.data.formData = data
    updateResumeData(componentId, this.data.formData, '')
  }
  handleSelect = (event) => {
    const { name, value } = get(event, 'target', {})
    this.data.formData[name] = value
  }
  renderControlWithMods = (controlData) => {
    const { errors, touched, handleChange, controlProps } = controlData
    const { name = '' } = controlProps
    const modifiedProps = { handleChange, options: [], selectedText: '' }
    if (name === 'gender') {
      modifiedProps.onSelect = this.handleSelect
      modifiedProps.options.push(
        ...['Select Your Gender!', 'Male', 'Female', 'Transgender']
      )
      modifiedProps.selectedText =
        this.data.formData['gender'] || modifiedProps.options[0]
    }
    return (
      <ControlCreator
        parentClassName={`d-flex flex-wrap justify-items-center px-2 ${
          name === 'dob' ? 'mt-3' : ''
        }`}
        labelClassName='rb-field-label'
        required={true}
        errors={errors}
        touched={touched}
        {...controlProps}
        {...modifiedProps}
      />
    )
  }
  render() {
    const { CustomToggle } = this.props
    return (
      <Card className='basic-info-container w-100 m-auto d-flex flex-wrap justify-content-start'>
        <CustomToggle
          as={Card.Header}
          eventKey='0'
          className='rb-section-label w-100'>
          Basic Info
        </CustomToggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <RenderForm
              initialValues={this.data.formData}
              validationSchema={validationSchema}
              handleSubmit={this.handleSubmit}>
              {({ errors, touched, handleChange }) => (
                <Form className='d-flex flex-wrap justify-content-start align-items-center w-100'>
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
                  <Row
                    noGutters
                    className='d-flex justify-content-around w-100'>
                    <Button
                      className='btn-dark submit-button mx-1'
                      type='submit'>
                      Save
                    </Button>
                  </Row>
                </Form>
              )}
            </RenderForm>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}

const BasicInfo = view(BasicInfoWrapper)

export default BasicInfo
export { BasicInfo }
