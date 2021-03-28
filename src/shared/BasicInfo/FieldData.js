import * as Yup from 'yup'
const fieldsCollection = [
  {
    label: 'First Name',
    name: 'firstName',
    id: 'firstName',
    type: 'text',
    placeholder: 'Hello',
  },
  {
    label: 'Last Name',
    name: 'lastName',
    id: 'lastName',
    type: 'text',
    placeholder: 'World',
  },
  {
    label: 'Gender',
    name: 'gender',
    id: 'gender',
    type: 'dropdown',
  },
  {
    label: 'Date of birth',
    name: 'dob',
    id: 'dob',
    type: 'text',
    placeholder: 'YYYY-MM-DD'
  },
]

const datePattern = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  gender: Yup.string()
    .required('Please choose a valid gender!')
    .matches(/^(male|female|transgender)$/, 'Please choose a valid gender!'),
  dob: Yup.string().matches(datePattern, "Invalid date format")
})
export default fieldsCollection
export { fieldsCollection, validationSchema }
