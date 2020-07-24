import React, {useEffect, useState} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import {Field, Form, Formik} from 'formik'
import cn from 'classnames'
import {CategoryOutputType} from '../../../../store/categories-reducer'
import {BookSchema} from '../Books'
import s from './EditingBook.module.sass'
import {BookType} from '../../../../store/books-reducer'


type PropsType = {
    readCategories: () => void
    readBook: (id: string) => Promise<any>
    updateBook: (book: BookType) => void
    categories: CategoryOutputType[]
}

const EditingBook: React.FC<PropsType> = props => {
    const {id} = useParams()
    const [book, setBook] = useState<BookType | null>(null)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)
    const readCategories = props.readCategories
    const readBook = props.readBook

    useEffect(() => {
        readCategories()
        readBook(id).then(response => {
            setBook(response)
        })
    }, [readCategories, readBook, id])

    return isRedirect ? <Redirect to={'/admin/books'}/> : <>
        {book && (
            <Formik
                initialValues={{
                    name: book.name,
                    description: book.description,
                    author: book.author,
                    year: book.year,
                    categoryId: book.category?._id,
                } as BookType}
                validationSchema={BookSchema}
                onSubmit={(values) => {
                    props.updateBook({...values, _id: id})
                    setIsRedirect(true)
                }}>
                {({errors, touched}) => (
                    <Form className={cn('form', s.form)}>
                        <div className="formElement">
                            <Field
                                name="categoryId"
                                className="formElement__element"
                                as="select"
                            >
                                {props.categories.map(item => {
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
                        <div className="formElement">
                            <Field name="author" className="formElement__element" placeholder="Автор"/>
                            {errors.author && touched.author ? (
                                <div className="formElement__hint">{errors.author}</div>
                            ) : null}
                        </div>
                        <div className="formElement">
                            <Field name="year" type={'number'} className="formElement__element" placeholder="Год"/>
                            {errors.year && touched.year ? (
                                <div className="formElement__hint">{errors.year}</div>
                            ) : null}
                        </div>
                        <div className="formElement">
                            <Field name="description" as="textarea" className="formElement__element"
                                   placeholder="Описание" rows="5"/>
                            {errors.description && touched.description ? (
                                <div className="formElement__hint">{errors.description}</div>
                            ) : null}
                        </div>

                        <button className="button button_primary" type="submit">Обновить книгу!</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default EditingBook