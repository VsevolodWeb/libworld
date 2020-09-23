import React, {ChangeEvent, useEffect, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {Field, Form, Formik} from 'formik'
import cn from 'classnames'
import {readCategoriesThunkCreator} from '../../../../store/categories-reducer'
import {BookSchema} from '../Books'
import s from './EditingBook.module.sass'
import {BookType, readBookThunkCreator, updateBookThunkCreator} from '../../../../store/books-reducer'
import {OnCoverChangeType} from '../../Admin'
import clientConfig from '../../../../config/default.config'
import {useDispatch, useSelector} from 'react-redux'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../../store/store'
import {AnyAction} from 'redux'
import {getCategories} from '../../../../store/categories-selectors'


type PropsType = {
    onCoverChange: OnCoverChangeType
}

const EditingBook: React.FC<PropsType> = props => {
    const categories = useSelector(getCategories)
    const dispatch: ThunkDispatch<AppStateType, any, AnyAction> = useDispatch()
    const {id} = useParams()
    const [book, setBook] = useState<BookType | null>(null)
    const [cover, setCover] = useState<string | null>(null)
    const [isRedirect, setIsRedirect] = useState<boolean>(false)

    useEffect(() => {
        dispatch(readCategoriesThunkCreator()).then(r => r)
        dispatch(readBookThunkCreator(id)).then(response => {
            setBook(response!)
        })
    }, [dispatch, id])

    const onCoverChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
        props.onCoverChange(changeEvent, readerEvent => {
            setCover(readerEvent.target && readerEvent.target.result as string)
        })
    }

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
                onSubmit={async (values) => {
                    await dispatch(updateBookThunkCreator({...values, _id: id, cover: cover!}))
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
                        <div className="formElement">
                            <button type="button" className="button button_link">
                                <label htmlFor="book-cover">Прикрепить обложку</label>
                            </button>

                            {(cover || book?.cover) && <img src={cover ? cover : clientConfig.getBookImageFolderURL() + book?.cover} className={s.preview} alt="Ваша выбранная обложка"/>}

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

                        <button className="button button_primary" type="submit">Обновить книгу</button>
                    </Form>
                )}
            </Formik>
        )}
    </>
}

export default EditingBook