import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {Field, Form, Formik,} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import s from "./Categories.module.sass"
import {addingCategoryThunkCreatorType, CategoryType} from "../../../store/categories-reducer";


export const CategorySchema = Yup.object().shape<CategoryType>({
    name: Yup.string()
        .min(2, 'Название категории слишком короткое')
        .max(50, 'Название категории слишком длинное')
        .required('Обязательно для заполнения'),
    description: Yup.string()
        .min(2, 'Описание категории слишком короткое')
        .required('Обязательно для заполнения')
});


type PropsType = {
    getCategories: () => void
    removeCategory: (id: string) => void
    addingCategory: addingCategoryThunkCreatorType
    categories: CategoryType[]
}

const Categories: React.FC<PropsType> = props => {
    const getCategories = props.getCategories;

    useEffect(() => {
        getCategories();
    }, [getCategories])

    const removeCategory = (id: string) => {
        props.removeCategory(id)
    }

    return (
        <div>
            <h1 className="title title_lg">Категории</h1>
            <Formik
                initialValues={{name: '', description: ''}}
                onSubmit={(values, {setErrors, resetForm}) => {
                    props.addingCategory(values, setErrors, resetForm)
                }}
                validationSchema={CategorySchema}
            >
                {({errors, touched}) => (
                    <Form className={cn("form", s.form)}>
                        <div className="formElement">
                            <Field name="name" className="formElement__element"/>
                            {errors.name && touched.name ? (
                                <div className="formElement__hint">{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="formElement">
                            <Field name="description" as="textarea" className="formElement__element"/>
                            {errors.description && touched.description ? (
                                <div className="formElement__hint">{errors.description}</div>
                            ) : null}
                        </div>
                        <button className="button button_light">Добавить новую категорию!</button>
                    </Form>
                )}
            </Formik>
            <table>
                <tbody>
                {props.categories.map((item, key) => (
                    <tr key={key}>
                        <td>
                            <NavLink to={`/admin/categories/${item.id}`}>{item.name}</NavLink>
                        </td>
                        <td>{item.description}</td>
                        <td>
                            <button onClick={() => {
                                removeCategory(item.id!)
                            }}>Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;