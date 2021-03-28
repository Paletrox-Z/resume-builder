import { store, view } from 'react-easy-state'

class ResumeDataContainer {
  data = store({
    basicInfo: {},
    contactInfo: {},
    workExperienceInfo: {},
    educationInfo: {},
  })
}

const resumeDataWrapper = view(new ResumeDataContainer())
const resumeDataContainer = resumeDataWrapper.data

export default resumeDataContainer
