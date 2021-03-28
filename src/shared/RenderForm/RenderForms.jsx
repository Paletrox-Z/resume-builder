import React from 'react'
import { Formik } from 'formik'

export const RenderForm = (props) => {
  const {
    initialValues = {},
    validationSchema,
    handleSubmit,
  } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {props.children}
    </Formik>
  )
}
