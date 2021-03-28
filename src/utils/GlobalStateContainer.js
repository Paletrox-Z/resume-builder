import { store, view } from 'react-easy-state'

class GlobalStateContainer {
  data = store({
    finalResumeData: {
      basicInfo: {
        firstName: 'Asd',
        lastName: 'Asd',
        gender: 'female',
        dob: '2012-05-20',
      },
      contactInfo: {
        ciAddressLine1: 'address line 1',
        ciAddressLine2: 'address line 2',
        ciAddressLine3: 'address line 3',
        ciCountry: 'india',
        ciState: 'meghalaya',
        ciPinCode: '123456',
        ciPhoneNumber: '1283456790',
        ciEmail: '12346798@d.v',
      },
      educationInfo: {
        1616924760: {
          eduInstituteName: 'Test',
          eduAddressLine1: 'address line 1',
          eduAddressLine2: 'address line 2',
          eduAddressLine3: 'address line 3',
          eduCountry: 'india',
          eduState: 'meghalaya',
          eduPinCode: '123456',
          eduFrom: '2024-05-20',
          eduTo: '2024-05-20',
          eduCourse: 'Test',
        },
        1616924761: {
          eduInstituteName: 'Test',
          eduAddressLine1: 'address line 1',
          eduAddressLine2: 'address line 2',
          eduAddressLine3: 'address line 3',
          eduCountry: 'india',
          eduState: 'meghalaya',
          eduPinCode: '123456',
          eduFrom: '2024-05-20',
          eduTo: '2024-05-20',
          eduCourse: 'Test',
        },
      },
      workExperienceInfo: {
        1616924740: {
          wexCompanyName: 'ABC',
          wexAddressLine1: 'address line 1',
          wexAddressLine2: 'address line 2',
          wexAddressLine3: 'address line 3',
          wexCountry: 'india',
          wexState: 'meghalaya',
          wexPinCode: '123456',
          wexFrom: '2004-04-20',
          wexTo: '2004-04-20',
        },
        1616924744: {
          wexCompanyName: 'ABC',
          wexAddressLine1: 'address line 1',
          wexAddressLine2: 'address line 2',
          wexAddressLine3: 'address line 3',
          wexCountry: 'india',
          wexState: 'meghalaya',
          wexPinCode: '123456',
          wexFrom: '2004-04-20',
          wexTo: '2021-03-28',
        },
      },
    },
  })
}

const globalStateContainerWrapper = view(new GlobalStateContainer())
const globalStateContainer = globalStateContainerWrapper.data

export default globalStateContainer
export { globalStateContainer }
