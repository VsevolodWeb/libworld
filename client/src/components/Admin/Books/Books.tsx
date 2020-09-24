import React, {ChangeEvent, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {Field, Form, Formik,} from 'formik'
import config from '../../../config/default.config'
import * as Yup from 'yup'
import cn from 'classnames'
import s from './Books.module.sass'
import {
	BookType,
	createBookThunkCreator,
	deleteBookThunkCreator,
	readBooksThunkCreator
} from '../../../store/books-reducer'
import {readCategoriesThunkCreator} from '../../../store/categories-reducer'
import {OnCoverChangeType} from '../Admin'
import {useDispatch, useSelector} from 'react-redux'
import {getCategories} from '../../../store/categories-selectors'
import {getBooks} from '../../../store/books-selectors'


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
	year: Yup.number().required('Обязательно для заполнения'),
	text: Yup.mixed<FormData>().required('Обязательно прикрепите файл с txt книгой')
})


type PropsType = {
	onCoverChange: OnCoverChangeType
}

const Books: React.FC<PropsType> = props => {
	const categories = useSelector(getCategories)
	const books = useSelector(getBooks)
	const dispatch = useDispatch()
	const [cover, setCover] = useState<string | null>(null)

	useEffect(() => {
		dispatch(readBooksThunkCreator())
		dispatch(readCategoriesThunkCreator())
	}, [dispatch])

	const deleteBook = (_id: string) => {
		dispatch(deleteBookThunkCreator(_id))
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
						name: '2222222', cover: '', description: '33333', author: '444', year: 2222,
						categoryId: categories[0] ? categories[0]._id : '',
						text: new FormData()
					} as BookType
				}
				onSubmit={(values, {setErrors, resetForm}) => {
					setCover(null)
					dispatch(createBookThunkCreator({...values, cover: cover!}, setErrors, resetForm))
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
								{categories.map(item => {
									const option = <option key={item._id} value={item._id}>{item.name}</option>

									if (item.subcategories) {
										return [
											option,
											...item.subcategories
												.map(item => <option key={item._id} value={item._id}>--- {item.name}</option>)
										]
									}

									return option
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

							<Field id="book-cover" name="cover" type="file" accept="image/jpeg" onChange={onCoverChange}
							       hidden/>
							{errors.cover && touched.cover ? (
								<div className="formElement__hint">{errors.cover}</div>
							) : null}

						</div>
						<div className="formElement">
							<Field id="book-cover" name="text" type="file" accept="text/plain"
							       className="formElement__element"/>
							{errors.text && touched.text ? (
								<div className="formElement__hint">{errors.text}</div>
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
			{books.length ?
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
					{books.map((item) => (
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
									        onClick={() => deleteBook(item._id!)}>
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