import React from 'react';
import {FormikProps, Form, Field} from 'formik';
import {FormValues} from "./AddingCategoryFormContainer";


const AddingCategoryForm = (props: FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting} = props;
    return (
        <Form>
            <h1>Добавить жанр</h1>
            <div>
                <Field type="text" name="name" placeholder="Название жанра"/>
                {touched.name && errors.name && <div>{errors.name}</div>}
            </div>

            <div>
                <Field type="text" name="name" placeholder="Описание жанра"/>
                {touched.description && errors.description && <div>{errors.description}</div>}
            </div>


            <button type="submit" disabled={isSubmitting}>
                Добавить
            </button>
        </Form>
    );
};

export default AddingCategoryForm;