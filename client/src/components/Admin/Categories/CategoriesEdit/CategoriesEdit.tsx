import React, {useEffect, useState} from "react"
import {useParams, Redirect} from "react-router-dom"
import {Field, Form, Formik} from "formik"
import cn from "classnames"
import {CategoryOutputType, CategoryType} from "../../../../store/categories-reducer"
import {CategorySchema} from "../Categories"
import s from "./CategoriesEdit.module.sass"


type PropsType = {
    getCategory: (id: string) => Promise<CategoryType>
    updateCategory: (category: CategoryType) => void
    categories: CategoryOutputType[]
}

const CategoriesEdit: React.FC<PropsType> = props => {
    const {id} = useParams()
    const [category, setCategory] = useState<CategoryType | null>(null)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const getCategory = props.getCategory

    useEffect(() => {
        getCategory(id).then(response => {
            setCategory(response)
        })
    }, [getCategory, id])

    return isRedirect ? <Redirect to={"/admin/categories"}/> : <>
        {category && (
            <Formik
                initialValues={{
                    name: category?.name,
                    description: category?.description
                }}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                    props.updateCategory({...values, id})
                    setIsRedirect(true)
                }}>
                {({errors, touched, handleChange, handleBlur}) => (
                    <Form className={cn("form", s.form)}>
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
                        <button className="button button_success">Обновить категорию</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default CategoriesEdit