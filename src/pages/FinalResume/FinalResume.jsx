import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { globalStateContainer } from 'src/utils'
import { getFormattedDate } from 'src/shared/WorkExperienceInfo/FieldData'
import './styles.scss'

class FinalResume extends React.Component {
  constructor(props) {
    super(props)
  }
  renderBasicInfo = (basicInfo = {}) => {
    const { firstName, lastName, gender, dob } = basicInfo
    return (
      <Row noGutters className='basic-info-container w-100 d-flex flex-wrap'>
        <Row noGutters className='w-100'>
          <span className='font-weight-bolder mr-1'>Name:</span>
          <span className='mr-1'>{firstName}</span>
          <span className='mr-1'>{lastName}</span>
          <span>({gender})</span>
        </Row>
        <Row noGutters className='w-100'>
          <span className='font-weight-bolder mr-1'>Date Of Birth:</span>
          <span>{dob}</span>
        </Row>
      </Row>
    )
  }
  renderContactInfo = (contactInfo = {}) => {
    const {
      ciAddressLine1,
      ciAddressLine2,
      ciAddressLine3,
      ciCountry,
      ciState,
      ciPinCode,
      ciPhoneNumber,
      ciEmail,
    } = contactInfo
    return (
      <Row noGutters className='contact-info-container w-100'>
        <Col sm={12} className='d-flex justify-content-between'>
          <div>
            <span className='font-weight-bolder mr-1'>Phone:</span>
            <span>{ciPhoneNumber}</span>
          </div>
          <div>
            <span className='font-weight-bolder mr-1'>Email:</span>
            <span>{ciEmail}</span>
          </div>
        </Col>
        <Col className='text-capitalize'>
          <div>
            <span className='font-weight-bolder mr-1'>Address:</span>
            <Row noGutters>
              <Col sm={12}>
                {ciAddressLine1}, {ciAddressLine2},
              </Col>
              <Col sm={12}>
                {ciAddressLine3}, {ciState},
              </Col>
              <Col sm={12}>
                {ciCountry} - {ciPinCode}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
  getRenderableData = (dataSet = {}) =>
    Object.keys(dataSet).map((data) => dataSet[data])
  renderWorkExperienceInfo = (workExperienceInfo = {}) => {
    const data = [...this.getRenderableData(workExperienceInfo)]
    return data.map((info, index) => {
      const {
        wexCompanyName,
        wexAddressLine1,
        wexAddressLine2,
        wexAddressLine3,
        wexCountry,
        wexState,
        wexPinCode,
        wexFrom,
        wexTo,
      } = info
      return (
        <Row noGutters className='info-set-block w-100'>
          <Col sm={12}>
            <span className='mr-1'>Work Experience from</span>{' '}
            <span className='font-weight-bolder'>{wexCompanyName}</span>
          </Col>
          <Col sm={12}>
            <Row noGutters>
              <Col sm={12}>
                <span className='mr-1'>Worked from:</span>
                <span className='mr-1'>{wexFrom}</span>
                <span className='mr-1'>Till</span>
                <span>{wexTo === getFormattedDate() ? 'Present' : wexTo}</span>
              </Col>
            </Row>
            <Row noGutters>{wexCompanyName}</Row>
            <Row noGutters>
              <Col sm={12}>
                {wexAddressLine1}, {wexAddressLine2},
              </Col>
              <Col sm={12}>
                {wexAddressLine3}, {wexState},
              </Col>
              <Col sm={12}>
                {wexCountry} - {wexPinCode}
              </Col>
            </Row>
          </Col>
        </Row>
      )
    })
  }
  renderEducationInfo = (educationInfo = {}) => {
    const data = [...this.getRenderableData(educationInfo)]
    return data.map((info, index) => {
      const {
        eduInstituteName,
        eduAddressLine1,
        eduAddressLine2,
        eduAddressLine3,
        eduCountry,
        eduState,
        eduPinCode,
        eduFrom,
        eduTo,
        eduCourse,
      } = info
      return (
        <Row noGutters className='info-set-block w-100'>
          <Col sm={12}>Education: {eduCourse}</Col>
          <Col sm={12}>
            <Row noGutters>{eduInstituteName}</Row>
            <Row noGutters>
              <Col sm={12}>
                {eduAddressLine1}, {eduAddressLine2},
              </Col>
              <Col sm={12}>
                {eduAddressLine3}, {eduState},
              </Col>
              <Col sm={12}>
                {eduCountry}, {eduPinCode}
              </Col>
            </Row>
            <Row noGutters>
              <Col sm={12}>Studied from: {eduFrom}</Col>
              <Col sm={12}>Studied till: {eduTo}</Col>
            </Row>
          </Col>
        </Row>
      )
    })
  }
  render() {
    const {
      basicInfo = false,
      contactInfo = false,
      workExperienceInfo = false,
      educationInfo = false,
    } = globalStateContainer.finalResumeData
    const isAllDataAvailable =
      basicInfo || contactInfo || workExperienceInfo || educationInfo
    return (
      <Row
        noGutters
        className='final-resume-parent d-flex w-100 text-capitalize'>
        <Row noGutters className='final-resume-internal-container d-flex'>
          {!isAllDataAvailable &&
            'Oopss... Your resume is either incomplete or not yet available!'}
          {basicInfo && this.renderBasicInfo(basicInfo)}
          {contactInfo && this.renderContactInfo(contactInfo)}
          {workExperienceInfo &&
            this.renderWorkExperienceInfo(workExperienceInfo)}
          {educationInfo && this.renderEducationInfo(educationInfo)}
        </Row>
      </Row>
    )
  }
}

export default FinalResume
export { FinalResume }
