import React from 'react';
import { FormikProps, Form, Field } from 'formik';


type FormValues = {
  email: string
  password: string
}

type OtherProps = {
  message: string
}


const AddingCategoryForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="email" name="email" />
      {touched.email && errors.email && <div>{errors.email}</div>}

      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

export default AddingCategoryForm;