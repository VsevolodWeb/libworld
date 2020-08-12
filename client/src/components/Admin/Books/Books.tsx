import React, {ChangeEvent, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {Field, Form, Formik,} from 'formik'
import config from '../../../config/default.config'
import * as Yup from 'yup'
import cn from 'classnames'
import s from './Books.module.sass'
import {BookType, createBookThunkCreatorType} from '../../../store/books-reducer'
import {CategoryType} from '../../../store/categories-reducer'
import {OnCoverChangeType} from '../Admin'


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
    onCoverChange: OnCoverChangeType
    books: BookType[]
    categories: CategoryType[]
}

const Books: React.FC<PropsType> = props => {
    const [cover, setCover] = useState<string | null>(null)
    const readBooks = props.readBooks
    const readCategories = props.readCategories

    useEffect(() => {
        readBooks()
        readCategories()
    }, [readBooks, readCategories])

    const removeBook = (_id: string) => {
        props.deleteBook(_id)
    }

    const onCoverChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        props.onCoverChange(changeEvent, readerEvent => {
            setCover(readerEvent.target && readerEvent.target.result as string)
        })
    }

    return (
        <div>
            <h1 className="title title_lg">Книги</h1>
            <Formik
                initialValues={
                    {
                        name: '', cover: '', description: '', author: '', year: '',
                        categoryId: props.categories[0] ? props.categories[0]._id : ''
                    } as BookType
                }
                onSubmit={(values, {setErrors, resetForm}) => {
                    setCover(null)
                    props.createBook({...values, cover: cover!}, setErrors, resetForm)
                }}
                validationSchema={BookSchema}
                enableReinitialize={true}
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
                            <button type="button" className="button button_link">
                                <label htmlFor="book-cover">Прикрепить обложку</label>
                            </button>
                            {cover && <img src={cover} className={s.preview} alt="Ваша выбранная обложка"/>}

                            <Field id="book-cover" name="cover" type="file" accept="image/jpeg"
                                   className="formElement__element"
                                   onChange={onCoverChange} hidden/>
                            {errors.cover && touched.cover ? (
                                <div className="formElement__hint">{errors.cover}</div>
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

                        <button className="button button_primary" type="submit">Добавить новую книгу!</button>
                    </Form>
                )}
            </Formik>
            {props.books.length ?
                <table className={cn('table', s.table)}>
                    <thead>
                    <tr>
                        <th>Обложка</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Категория</th>
                        <th>Автор</th>
                        <th>Год</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.books.map((item) => (
                        <React.Fragment key={item._id}>
                            <tr>
                                <td>
                                    {item.cover ?
                                        <img
                                            src={`${config.getBookImageFolderURL()}/${item.cover}`}
                                            className={s.table__image}
                                            alt={item.name}/> : '—'}
                                </td>
                                <td>
                                    <NavLink to={`/admin/books/${item._id}`}
                                             className="link">{item.name}
                                    </NavLink>
                                </td>
                                <td>{item.description}</td>
                                <td>{item.category?.name}</td>
                                <td>{item.author}</td>
                                <td>{item.year}</td>
                                <td>
                                    <button className="button button_sm button_secondary"
                                            onClick={() => removeBook(item._id!)}>
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