import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {Field, Form, Formik,} from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import s from "./Categories.module.sass"
import {
    addingCategoryThunkCreatorType,
    CategoryOutputType, CategoryType
} from "../../../store/categories-reducer"


export const CategorySchema = Yup.object().shape<CategoryType>({
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
    getCategory: (id: string, parentId: string) => Promise<CategoryType>
    removeCategory: (id: string, parentId: string) => void
    updateCategory: (category: CategoryType) => void
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
                    {name: '', description: ''}
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
                                    return <option key={item._id} value={item._id}>{item.name}</option>
                                })}
                            </select>
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
                        <button className="button button_primary">Добавить новую категорию!</button>
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
                        <React.Fragment key={parentItem._id}>
                            <tr>
                                <td>
                                    <NavLink to={`/admin/categories/${parentItem._id}`}
                                             className="link">{parentItem.name}
                                    </NavLink>
                                </td>
                                <td>{parentItem.description}</td>
                                <td>
                                    <button className="button button_sm button_secondary"
                                            onClick={() => removeCategory(parentItem._id!, '')}>Удалить
                                    </button>
                                </td>
                            </tr>
                            {parentItem.subcategories &&
                            parentItem.subcategories.map(item => {
                                return <tr key={item._id}>
                                    <td>
                                        --- <NavLink to={`/admin/categories/${item._id}`}
                                                     className="link">{item.name}</NavLink>
                                    </td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button className="button button_sm button_secondary"
                                                onClick={() => removeCategory(item._id!, parentItem._id!)}>Удалить
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