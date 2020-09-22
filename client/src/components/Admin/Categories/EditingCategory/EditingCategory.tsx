import React, {useEffect, useState} from "react"
import {useParams, Redirect} from "react-router-dom"
import {Field, Form, Formik} from "formik"
import cn from "classnames"
import {CategoryOutputType, CategoryType, readCategoryThunkCreator} from '../../../../store/categories-reducer'
import {CategorySchema} from "../Categories"
import s from "./EditingCategory.module.sass"
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../../store/store'
import {AnyAction} from 'redux'
import {getCategories} from '../../../../store/categories-selectors'


type PropsType = {
    readCategories: () => void
    readCategory: (id: string) => Promise<CategoryType>
    updateCategory: (category: CategoryType) => void
    categories: CategoryOutputType[]
}

const EditingCategory: React.FC<PropsType> = props => {
    const categories = useSelector(getCategories)
	const dispatch: ThunkDispatch<AppStateType, any, AnyAction> = useDispatch()
    const {id} = useParams()
    const [category, setCategory] = useState<CategoryType | null>(null)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)

    useEffect(() => {
	    dispatch(readCategoryThunkCreator(id)).then(response => {
            setCategory(response!)
        })
    }, [dispatch, id])

    return isRedirect ? <Redirect to={"/admin/categories"}/> : <>
        {category && (
            <Formik
                initialValues={{
                    name: category?.name,
                    description: category?.description,
                    parentId: category?.parentId
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                    props.updateCategory({...values, _id: id})
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
                                <option value="">Без категории</option>
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
                        <button className="button button_primary">Обновить категорию</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default EditingCategory