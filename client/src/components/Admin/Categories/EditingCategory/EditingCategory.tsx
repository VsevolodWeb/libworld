import React, {useEffect, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {Field, Form, Formik} from 'formik'
import cn from 'classnames'
import {
    CategoryType,
    readCategoriesThunkCreator,
    readCategoryThunkCreator,
    updateCategoryThunkCreator
} from '../../../../store/categories-reducer'
import {CategorySchema} from '../Categories'
import s from './EditingCategory.module.sass'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../../store/store'
import {AnyAction} from 'redux'
import {getCategories} from '../../../../store/categories-selectors'


function EditingCategory() {
    const categories = useSelector(getCategories)
	const dispatch: ThunkDispatch<AppStateType, any, AnyAction> = useDispatch()
    const {id} = useParams()
    const [category, setCategory] = useState<CategoryType | null>(null)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)

    useEffect(() => {
	    dispatch(readCategoryThunkCreator(id)).then(response => {
            setCategory(response!)
        })
        dispatch(readCategoriesThunkCreator()).then(r => r)
    }, [dispatch, id])

    return isRedirect ? <Redirect to={"/admin/categories"}/> : <>
        {category && (
            <Formik
                initialValues={{
                    name: category?.name,
                    description: category?.description,
                    parentId: String(category?.parentId)
                }}
                validationSchema={CategorySchema}
                onSubmit={async (values) => {
                    await dispatch(updateCategoryThunkCreator({...values, _id: id, parentId: values.parentId === "null" ? JSON.parse(values.parentId) : values.parentId}))
                    setIsRedirect(true)
                }}>
                {({errors, touched}) => (
                    <Form className={cn("form", s.form)}>
                        <div className="formElement">
                            <Field
                                name="parentId"
                                className="formElement__element"
                                as="select"
                            >
                                <option value="null">Без категории</option>
                                {categories.map(item => {
                                    return <option key={item._id} value={item._id}>{item.name}</option>
                                })}
                            </Field>
                        </div>
                        <div className="formElement">
                            <Field name="name" className="formElement__element" placeholder="Название"/>
                            {errors.name && touched.name ? (
                                <div className="formElement__hint">{errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="description" as="textarea" className="formElement__element"
                                   placeholder="Описание" rows="5"/>
                            {errors.description && touched.description ? (
                                <div className="formElement__hint">{errors.description}</div>
                            ) : null}
                        </div>
                        <button className="button button_primary" type="submit">Обновить категорию</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default EditingCategory