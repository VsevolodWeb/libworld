import React, {ChangeEvent, Suspense} from 'react'
import {Route, NavLink, Switch} from 'react-router-dom'

import Categories from './Categories/Categories'
import EditingCategory from './Categories/EditingCategory/EditingCategory'
import Books from './Books/Books'
import EditingBook from './Books/EditingBook/EditingBook'
import {PropsType} from './AdminContainer'
import s from './Admin.module.sass'

export type OnCoverChangeType = (e: ChangeEvent<HTMLInputElement>, readerOnLoad: (e: ProgressEvent<FileReader>) => void) => void


const Admin: React.FC<PropsType> = props => {
	const onCoverChange: OnCoverChangeType = (e, readerOnLoad) => {
		const coverFile = e.currentTarget.files && e.currentTarget.files[0]

		if (coverFile) {
			const coverBlob = new Blob([coverFile], {type: 'image/jpeg'})
			const reader = new FileReader()

			reader.onload = function (e) {
				readerOnLoad(e)
			}

			reader.readAsDataURL(coverBlob)
		}
	}

	return (
		<div>
			<ul className={s.menu}>
				<li className={s.menu__item}>
					<NavLink to="/admin/categories" className={s.menu__link}>Жанры</NavLink>
				</li>
				<li className={s.menu__item}>
					<NavLink to="/admin/books" className={s.menu__link}>Книги</NavLink>
				</li>
			</ul>
			<Switch>
				<Route exact path="/admin/categories">
					<Suspense fallback={<div>Загрузка</div>}>
						<Categories/>
					</Suspense>
				</Route>
				<Route path="/admin/categories/:id">
					<Suspense fallback={<div>Загрузка</div>}>
						<EditingCategory readCategories={props.readCategoriesThunkCreator}
						                 readCategory={props.readCategoryThunkCreator}
						                 updateCategory={props.updateCategoryThunkCreator}
						                 categories={props.categories}
						/>
					</Suspense>
				</Route>
				<Route exact path="/admin/books">
					<Suspense fallback={<div>Загрузка</div>}>
						<Books readBooks={props.readBooksThunkCreator}
						       readCategories={props.readCategoriesThunkCreator}
						       deleteBook={props.deleteBookThunkCreator}
						       createBook={props.createBookThunkCreator}
						       onCoverChange={onCoverChange}
						       books={props.books}
						       categories={props.categories}
						/>
					</Suspense>
				</Route>
				<Route path="/admin/books/:id">
					<Suspense fallback={<div>Загрузка</div>}>
						<EditingBook readBook={props.readBookThunkCreator}
						             readCategories={props.readCategoriesThunkCreator}
						             updateBook={props.updateBookThunkCreator}
						             onCoverChange={onCoverChange}
						             categories={props.categories}
						/>
					</Suspense>
				</Route>
			</Switch>
		</div>
	)
}

export default Admin