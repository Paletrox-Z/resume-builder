import * as Yup from 'yup'
import { getCountryWiseStatesList } from 'src/utils'

const fieldsCollection = [
  {
    label: 'Address Line 1',
    name: 'ciAddressLine1',
    id: 'ciAddressLine1',
    type: 'text',
    placeholder: 'Door#, Building or Apartment Name',
    maxLength: 50,
  },
  {
    label: 'Address Line 2',
    name: 'ciAddressLine2',
    id: 'ciAddressLine2',
    type: 'text',
    placeholder: 'Street# or Street Name, Area Name',
  },
  {
    label: 'Address Line 3',
    name: 'ciAddressLine3',
    id: 'ciAddressLine3',
    type: 'text',
    placeholder: 'District/Territory',
    required: false,
  },
  {
    label: 'Country',
    name: 'ciCountry',
    id: 'ciCountry',
    type: 'dropdown',
  },
  {
    label: 'State',
    name: 'ciState',
    id: 'ciState',
    type: 'dropdown',
  },
  {
    label: 'Pin Code',
    name: 'ciPinCode',
    id: 'ciPinCode',
    type: 'tel',
    maxLength: 6,
    placeholder: '000000',
  },
  {
    label: 'Phone Number',
    name: 'ciPhoneNumber',
    id: 'ciPhoneNumber',
    type: 'tel',
    maxLength: 10,
    placeholder: '0000000000',
  },
  {
    label: 'Email ID',
    name: 'ciEmail',
    id: 'ciEmail',
    type: 'email',
    maxLength: 80,
    placeholder: 'example@example.com',
  },
]

const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
const statesListPattern = () => {
  return new RegExp(
    `^${getCountryWiseStatesList['India']
      .map((state) => state)
      .join()
      .replaceAll(',', '|').replaceAll(' ', '').toLowerCase()}$`
  )
}

const validationSchema = Yup.object().shape({
  ciAddressLine1: Yup.string()
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  ciAddressLine2: Yup.string()
    .required('Required')
    .min(2, 'Address is too short')
    .max(50, 'Address is too long')
    .required('Required'),
  ciAddressLine3: Yup.string(),
  ciEmail: Yup.string().email('Email format invalid!').required('Required'),
  ciState: Yup.string()
    .matches(statesListPattern(), 'Invalid state!')
    .required('Required'),
  ciCountry: Yup.string()
    .required('Required')
    .matches(/^india$/, 'Invalid country!'),
  ciPinCode: Yup.string().matches(new RegExp('^\\d{6}$')).required('Required'),
  ciPhoneNumber: Yup.string()
    .matches(new RegExp('^\\d{10}$'))
    .required('Required'),
})

export default fieldsCollection
export { fieldsCollection, validationSchema }
