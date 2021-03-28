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
    label: 'Company Name',
    name: 'wexCompanyName',
    id: 'wexCompanyName',
    type: 'text',
    placeholder: 'Example Pvt Ltd',
    maxLength: 50,
  },
  {
    label: 'Address Line 1',
    name: 'wexAddressLine1',
    id: 'wexAddressLine1',
    type: 'text',
    placeholder: 'Street# or Street Name, Area Name',
  },
  {
    label: 'Address Line 2',
    name: 'wexAddressLine2',
    id: 'wexAddressLine2',
    type: 'text',
    placeholder: 'Street# or Street Name, Area Name',
  },
  {
    label: 'Address Line 3',
    name: 'wexAddressLine3',
    id: 'wexAddressLine3',
    type: 'text',
    placeholder: 'District/Territory',
    required: false,
  },
  {
    label: 'Country',
    name: 'wexCountry',
    id: 'wexCountry',
    type: 'dropdown',
  },
  {
    label: 'State',
    name: 'wexState',
    id: 'wexState',
    type: 'dropdown',
  },
  {
    label: 'Pin Code',
    name: 'wexPinCode',
    id: 'wexPinCode',
    type: 'tel',
    maxLength: 6,
    placeholder: '000000',
  },
  {
    label: 'Working From',
    name: 'wexFrom',
    id: 'wexFrom',
    type: 'text',
    maxLength: 10,
    placeholder: 'YYYY-MM-DD',
  },
  {
    label: 'Working Till',
    name: 'wexTo',
    id: 'wexTo',
    type: 'text',
    maxLength: 10,
    placeholder: 'YYYY-MM-DD',
  },
]

const validationSchema = Yup.object().shape({
  wexCompanyName: Yup.string()
    .min(2, 'Company Name is too short')
    .max(80, 'Company Name is too long')
    .required('Required'),
  wexAddressLine1: Yup.string()
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  wexAddressLine2: Yup.string()
    .required('Required')
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  wexAddressLine3: Yup.string(),
  wexState: Yup.string()
    .required('Required')
    .matches(
      getListBasedPattern(getCountryWiseStatesList['India']),
      'Invalid state selected!'
    ),
  wexCountry: Yup.string()
    .required('Required')
    .matches(/^(india)$/, 'Invalid country selected!'),
  wexPinCode: Yup.string().matches(new RegExp('^\\d{6}$')).required('Required'),
  wexFrom: Yup.string()
    .matches(datePattern, 'Invalid date format')
    .required('Required'),
  wexTo: Yup.string()
    .matches(datePattern, 'Invalid date format')
    .required('Required'),
})

export default fieldsCollection
export { fieldsCollection, validationSchema, getFormattedDate }
