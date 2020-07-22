import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {Field, Form, Formik,} from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import s from './Books.module.sass'
import {BookType, createBookThunkCreatorType} from '../../../store/books-reducer'
import {CategoryType} from '../../../store/categories-reducer'


export const BookSchema = Yup.object().shape<BookType>({
    name: Yup.string()
        .min(2, 'Название книги слишком короткое')
        .max(50, 'Название книги слишком длинное')
        .required('Обязательно для заполнения'),
    description: Yup.string()
        .min(2, 'Описание книги слишком короткое')
        .required('Обязательно для заполнения'),
    author: Yup.string()
        .required('Обязательно для заполнения'),
    categoryId: Yup.string().optional(),
    year: Yup.number().required('Обязательно для заполнения')
})


type PropsType = {
    createBook: createBookThunkCreatorType
    readBooks: () => void
    readCategories: () => void
    deleteBook: (_id: string) => void
    books: BookType[]
    categories: CategoryType[]
}

const Books: React.FC<PropsType> = props => {
    const readBooks = props.readBooks
    const readCategories = props.readCategories

    useEffect(() => {
        readBooks()
        readCategories()
    }, [readBooks, readCategories])

    const removeBook = (_id: string) => {
        props.deleteBook(_id)
    }

    return (
        <div>
            <h1 className="title title_lg">Книги</h1>
            <Formik
                initialValues={
                    {name: '', description: '', author: ''} as BookType
                }
                onSubmit={(values, {setErrors, resetForm}) => {
                    props.createBook(values, setErrors, resetForm)
                }}
                validationSchema={BookSchema}
            >
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
                            <Field name="year" className="formElement__element" placeholder="Год"/>
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

                        <button className="button button_primary" type="submit">Добавить новую книгу!</button>
                    </Form>
                )}
            </Formik>
            {props.categories.length ?
                <table className={cn('table', s.table)}>
                    <thead>
                    <tr>
                        <th>
                            Название
                        </th>
                        <th>
                            Описание
                        </th>
                        <th>
                            Автор
                        </th>
                        <th>
                            Год
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.books.map((parentItem) => (
                        <React.Fragment key={parentItem._id}>
                            <tr>
                                <td>
                                    <NavLink to={`/admin/books/${parentItem._id}`}
                                             className="link">{parentItem.name}
                                    </NavLink>
                                </td>
                                <td>{parentItem.description}</td>
                                <td>{parentItem.author}</td>
                                <td>{parentItem.year}</td>
                                <td>
                                    <button className="button button_sm button_secondary"
                                            onClick={() => removeBook(parentItem._id!)}>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                : null}
        </div>
    )
}

export default Books