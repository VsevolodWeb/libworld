import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import {CategoryType} from "../../../../store/categories-reducer";
import {Field, Form, Formik} from "formik";
import {CategorySchema} from "../Categories";


type PropsType = {
    getCategory: (id: string) => Promise<CategoryType>
    updateCategory: (category: CategoryType) => void
}

const Edit: React.FC<PropsType> = props => {
    const {id} = useParams()
    const [category, setCategory] = useState<CategoryType | null>(null)
    const getCategory = props.getCategory

    useEffect(() => {
        getCategory(id).then(response => {
            setCategory(response)
        })
    }, [getCategory, id])

    return <>
        {category && (
            <Formik
                initialValues={{name: category?.name, description: category?.description}}
                validationSchema={CategorySchema}
                onSubmit={(values) => {
                    props.updateCategory({...values, id})
                }}>
                {({errors, touched}) => (
                    <Form>
                        <div>
                            <Field name="name"/>
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="description" as="textarea"/>
                            {errors.description && touched.description ? (
                                <div>{errors.description}</div>
                            ) : null}
                        </div>
                        <button>Обновить категорию</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default Edit