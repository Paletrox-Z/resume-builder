import React from 'react'
import { store, view } from 'react-easy-state'
import {
  Row,
  Accordion,
  Card,
  Button,
  useAccordionToggle,
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import {
  BasicInfo,
  ContactInfo,
  WorkExperienceInfo,
  EducationInfo,
} from 'src/shared'
import resumeDataContainer from './ResumeDataContainer'
import { globalStateContainer } from 'src/utils'
import './styles.scss'

toast.configure()

const data = store({
  activeEventKey: '0',
})

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => (data.activeEventKey = eventKey)
  )

  return (
    <Button
      type='button'
      onClick={decoratedOnClick}
      className='btn-dark'
      disabled={data.activeEventKey === eventKey}>
      {children}
    </Button>
  )
}

class ResumeBuilderWrapper extends React.Component {
  data = store({})
  componentName = {
    basicInfo: 'Basic Information',
    contactInfo: 'Contact Information',
    workExperienceInfo: 'Work Experience Information',
    educationInfo: 'Education Information',
  }
  constructor(props) {
    super(props)
    this.data.activeSection = 0
    this.data.workExperienceSet = {}
    this.data.educationDetailsSet = {}
  }

  updateResumeData = (componentId = '', dataObject, contentId) => {
    if (contentId) {
      resumeDataContainer[componentId][contentId] = dataObject
    } else {
      resumeDataContainer[componentId] = dataObject
    }
    toast(
      `${this.componentName[componentId]}${
        contentId ? ` - ${contentId} ` : ''
      } saved!`
    )
  }

  /* Work Experience */

  addWorkExperience = () => {
    const workExperienceId = Math.floor(Date.now() / 1000)
    this.data.workExperienceSet[workExperienceId] = (
      <Row
        noGutters
        className='wex-container-set d-flex justify-content-around w-100 p-2 mb-2'>
        <WorkExperienceInfo
          componentId='workExperienceInfo'
          updateResumeData={this.updateResumeData}
          workExperienceId={workExperienceId}
          removeWorkExperience={this.removeWorkExperience}
        />
      </Row>
    )
  }

  removeWorkExperience = (workExperienceId = false) => {
    if (workExperienceId) {
      delete this.data.workExperienceSet[workExperienceId]
    }
  }

  renderWorkExperiences = () => {
    return Object.keys(this.data.workExperienceSet).map((workExperience) => {
      return this.data.workExperienceSet[workExperience]
    })
  }

  renderWorkExperienceContainer = () => {
    return (
      <Card className='work-exp-info-container w-100 m-auto d-flex flex-wrap justify-content-start'>
        <CustomToggle
          as={Card.Header}
          eventKey='2'
          className='rb-section-label w-100'>
          Work Experience Info
        </CustomToggle>
        <Accordion.Collapse className='collapsable-wrapper-mod' eventKey='2'>
          <Card.Body>
            {this.renderWorkExperiences()}
            <Row noGutters className='d-flex justify-content-around w-100'>
              <Button
                className='btn-dark submit-button mx-1'
                onClick={this.addWorkExperience}>
                Add Work Experience
              </Button>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  /* Work Experience */

  addEducationDetails = () => {
    const educationId = Math.floor(Date.now() / 1000)
    this.data.educationDetailsSet[educationId] = (
      <Row
        noGutters
        className='education-container-set d-flex justify-content-around w-100 p-2 mb-2'>
        <EducationInfo
          componentId='educationInfo'
          updateResumeData={this.updateResumeData}
          educationId={educationId}
          removeEducation={this.removeEducation}
        />
      </Row>
    )
  }

  removeEducation = (educationId = false) => {
    if (educationId) {
      delete this.data.educationDetailsSet[educationId]
    }
  }

  renderEducationHistory = () => {
    return Object.keys(this.data.educationDetailsSet).map((workExperience) => {
      return this.data.educationDetailsSet[workExperience]
    })
  }

  renderEducationContainer = () => {
    return (
      <Card className='education-info-container w-100 m-auto d-flex flex-wrap justify-content-start'>
        <CustomToggle
          as={Card.Header}
          eventKey='3'
          className='rb-section-label w-100'>
          Education Experience Info
        </CustomToggle>
        <Accordion.Collapse className='collapsable-wrapper-mod' eventKey='3'>
          <Card.Body>
            {this.renderEducationHistory()}
            <Row noGutters className='d-flex justify-content-around w-100'>
              <Button
                className='btn-dark submit-button mx-1'
                onClick={this.addEducationDetails}>
                Add Education
              </Button>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

  validateResumeDataAndRedirect = () => {
    globalStateContainer.finalResumeData = resumeDataContainer
    this.props.history.push('/build-resume')
  }

  render() {
    return (
      <Row
        noGutters
        className='resume-build-root-container px-4 m-auto d-flex justify-content-around'>
        <Accordion
          defaultActiveKey={`${this.data.activeSection}`}
          className='w-100 my-2'>
          <BasicInfo
            componentId='basicInfo'
            updateResumeData={this.updateResumeData}
            CustomToggle={CustomToggle}
          />
          <ContactInfo
            componentId='contactInfo'
            updateResumeData={this.updateResumeData}
            CustomToggle={CustomToggle}
          />
          {this.renderWorkExperienceContainer()}
          {this.renderEducationContainer()}
        </Accordion>
        <Button
          className='generate-resume-button btn-dark'
          onClick={this.validateResumeDataAndRedirect}>
          Build Resume
        </Button>
      </Row>
    )
  }
}

const ResumeBuilder = view(ResumeBuilderWrapper)

export default ResumeBuilder
export { ResumeBuilder }
