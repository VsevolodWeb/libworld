import React, {Suspense} from 'react'
import {Route, NavLink, Switch} from 'react-router-dom'

import Categories from './Categories/Categories'
import EditingCategory from './Categories/EditingCategory/EditingCategory'
import Books from './Books/Books'
import EditingBook from './Books/EditingBook/EditingBook'
import {PropsType} from './AdminContainer'
import s from './Admin.module.sass'


const Admin: React.FC<PropsType> = props => {
    return <div>
        <ul className={s.menu}>
            <li className={s.menu__item}>
                <NavLink to={'/admin/categories'} className={s.menu__link}>Жанры</NavLink>
            </li>
            <li className={s.menu__item}>
                <NavLink to={'/admin/books'} className={s.menu__link}>Книги</NavLink>
            </li>
        </ul>
        <Switch>
            <Route exact path="/admin/categories">
                <Suspense fallback={<div>Загрузка</div>}>
                    <Categories createCategory={props.createCategoryThunkCreator}
                                readCategories={props.readCategoriesThunkCreator}
                                deleteCategory={props.deleteCategoryThunkCreator}
                                categories={props.categories}
                    />
                </Suspense>
            </Route>
            <Route path={`/admin/categories/:id`}>
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
                           books={props.books}
                           categories={props.categories}
                    />
                </Suspense>
            </Route>
            <Route path={`/admin/books/:id`}>
                <Suspense fallback={<div>Загрузка</div>}>
                    <EditingBook readBook={props.readBookThunkCreator}
                                 readBooks={props.readBooksThunkCreator}
                                 updateBook={props.updateBookThunkCreator}
                                 categories={props.categories}/>
                </Suspense>
            </Route>
        </Switch>
    </div>
}

export default Admin