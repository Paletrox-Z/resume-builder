import * as Yup from 'yup'
import { getCountryWiseStatesList } from 'src/utils'

const datePattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/

const getListBasedPattern = (listItem = []) => {
  return new RegExp(
    `^${listItem
      .map((state) => state)
      .join()
      .replaceAll(',', '|')
      .replaceAll(' ', '')
      .toLowerCase()}$`
  )
}

const getFormattedDate = () => {
  const date = new Date()
  const map = {
    mm:
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
    dd: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    yyyy: date.getFullYear(),
  }
  return `${map.yyyy}-${map.mm}-${map.dd}`
}

const fieldsCollection = [
  {
    label: 'Institute Name',
    name: 'eduInstituteName',
    id: 'eduInstituteName',
    type: 'text',
    placeholder: 'Example Pvt Ltd',
    maxLength: 50,
  },
  {
    label: 'Address Line 1',
    name: 'eduAddressLine1',
    id: 'eduAddressLine1',
    type: 'text',
    placeholder: 'Street# or Street Name, Area Name',
  },
  {
    label: 'Address Line 2',
    name: 'eduAddressLine2',
    id: 'eduAddressLine2',
    type: 'text',
    placeholder: 'Street# or Street Name, Area Name',
  },
  {
    label: 'Address Line 3',
    name: 'eduAddressLine3',
    id: 'eduAddressLine3',
    type: 'text',
    placeholder: 'District/Territory',
    required: false,
  },
  {
    label: 'Country',
    name: 'eduCountry',
    id: 'eduCountry',
    type: 'dropdown',
  },
  {
    label: 'State',
    name: 'eduState',
    id: 'eduState',
    type: 'dropdown',
  },
  {
    label: 'Pin Code',
    name: 'eduPinCode',
    id: 'eduPinCode',
    type: 'tel',
    maxLength: 6,
    placeholder: '000000',
  },
  {
    label: 'Studied From',
    name: 'eduFrom',
    id: 'eduFrom',
    type: 'text',
    maxLength: 10,
    placeholder: 'YYYY-MM-DD',
  },
  {
    label: 'Studied Till',
    name: 'eduTo',
    id: 'eduTo',
    type: 'text',
    maxLength: 10,
    placeholder: 'YYYY-MM-DD',
  },
  {
    label: 'Course',
    name: 'eduCourse',
    id: 'eduCourse',
    type: 'text',
    maxLength: 50,
  },
]

const validationSchema = Yup.object().shape({
  eduInstituteName: Yup.string()
    .min(2, 'Company Name is too short')
    .max(80, 'Company Name is too long')
    .required('Required'),
  eduAddressLine1: Yup.string()
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  eduAddressLine2: Yup.string()
    .required('Required')
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  eduAddressLine3: Yup.string(),
  eduState: Yup.string()
    .required('Required')
    .matches(
      getListBasedPattern(getCountryWiseStatesList['India']),
      'Invalid state selected!'
    ),
  eduCountry: Yup.string()
    .required('Required')
    .matches(/^(india)$/, 'Invalid country selected!'),
  eduPinCode: Yup.string().matches(new RegExp('^\\d{6}$')).required('Required'),
  eduFrom: Yup.string()
    .matches(datePattern, 'Invalid date format')
    .required('Required'),
  eduTo: Yup.string()
    .matches(datePattern, 'Invalid date format')
    .required('Required'),
  eduCourse: Yup.string(),
})

export default fieldsCollection
export { fieldsCollection, validationSchema, getFormattedDate }
