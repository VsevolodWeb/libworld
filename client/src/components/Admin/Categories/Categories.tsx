import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {Field, Form, Formik,} from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import s from "./Categories.module.sass"
import {
    addingCategoryThunkCreatorType,
    CategoryInputType,
    CategoryOutputType
} from "../../../store/categories-reducer"


export const CategorySchema = Yup.object().shape<CategoryInputType>({
    name: Yup.string()
        .min(2, 'Название категории слишком короткое')
        .max(50, 'Название категории слишком длинное')
        .required('Обязательно для заполнения'),
    description: Yup.string()
        .min(2, 'Описание категории слишком короткое')
        .required('Обязательно для заполнения'),
    parentId: Yup.string().nullable().defined()
});


type PropsType = {
    getCategories: () => void
    removeCategory: (id: string, parentId: string) => void
    addingCategory: addingCategoryThunkCreatorType
    categories: CategoryOutputType[]
}

const Categories: React.FC<PropsType> = props => {
    const getCategories = props.getCategories;

    useEffect(() => {
        getCategories();
    }, [getCategories])

    const removeCategory = (id: string, parentId: string) => {
        props.removeCategory(id, parentId)
    }

    return (
        <div>
            <h1 className="title title_lg">Категории</h1>
            <Formik
                initialValues={
                    {name: '', description: '', parentId: null as null | string}
                }
                onSubmit={(values, {setErrors, resetForm}) => {
                    props.addingCategory(values, setErrors, resetForm)
                }}
                validationSchema={CategorySchema}
            >
                {({errors, touched, handleChange, handleBlur}) => (
                    <Form className={cn("form", s.form)}>
                        <div className="formElement">
                            <select name="parentId" className="formElement__element" onChange={handleChange}
                                    onBlur={handleBlur}>
                                <option>Без категории</option>
                                {props.categories.map(item => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            {errors.parentId && touched.parentId ? (
                                <div className="formElement__hint">{errors.parentId}</div>
                            ) : null}
                        </div>
                        <div className="formElement">
                            <Field name="name" className="formElement__element" placeholder="Название"/>
                            {errors.name && touched.name ? (
                                <div className="formElement__hint">{errors.name}</div>
                            ) : null}
                        </div>
                        <div className="formElement">
                            <Field name="description" as="textarea" className="formElement__element"
                                   placeholder="Описание" rows="5"/>
                            {errors.description && touched.description ? (
                                <div className="formElement__hint">{errors.description}</div>
                            ) : null}
                        </div>
                        <button className="button button_success">Добавить новую категорию!</button>
                    </Form>
                )}
            </Formik>
            {props.categories.length ?
                <table className={cn("table", s.table)}>
                    <thead>
                    <tr>
                        <th>
                            Название
                        </th>
                        <th>
                            Описание
                        </th>
                        <th>
                            Действия
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.categories.map((parentItem) => (
                        <React.Fragment key={parentItem.id}>
                            <tr>
                                <td>
                                    <NavLink to={`/admin/categories/${parentItem.id}`} className="link">{parentItem.name}</NavLink>
                                </td>
                                <td>{parentItem.description}</td>
                                <td>
                                    <button className="button button_sm button_error"
                                            onClick={() => removeCategory(parentItem.id!, '')}>Удалить
                                    </button>
                                </td>
                            </tr>
                            {parentItem.subcategories &&
                            parentItem.subcategories.map(item => {
                                return <tr key={item.id}>
                                    <td>
                                        --- <NavLink to={`/admin/categories/${item.id}`}
                                                     className="link">{item.name}</NavLink>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="button button_sm button_error"
                                                onClick={() => removeCategory(item.id!, parentItem.id!)}>Удалить
                                        </button>
                                    </td>
                                </tr>
                            })
                            }
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                : null}
        </div>
    );
};

export default Categories;