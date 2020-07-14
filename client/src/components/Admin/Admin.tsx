import React, {Suspense} from 'react'
import Categories from "./Categories/Categories"
import {Route, NavLink, Switch} from 'react-router-dom';

import {PropsType} from "./AdminContainer";
import s from "./Admin.module.sass"
import CategoriesEdit from "./Categories/CategoriesEdit/CategoriesEdit";


const Admin: React.FC<PropsType> = props => {
    return <div>
        <ul className={s.menu}>
            <li className={s.menu__item}>
                <NavLink to={"/admin/categories"} className={s.menu__link}>Жанры</NavLink>
            </li>
            <li className={s.menu__item}>
                <NavLink to={"/admin/books"} className={s.menu__link}>Книги</NavLink>
            </li>
        </ul>
        <Switch>
            <Route exact path="/admin/categories">
                <Suspense fallback={<div>Загрузка</div>}>
                    <Categories getCategories={props.getCategoriesThunkCreator}
                                removeCategory={props.removeCategoryThunkCreator}
                                getCategory={props.getCategoryThunkCreator}
                                updateCategory={props.updateCategoryThunkCreator}
                                createCategory={props.createCategoryThunkCreator}
                                categories={props.categories}
                    />
                </Suspense>
            </Route>
            <Route path={`/admin/categories/:id`}>
                <Suspense fallback={<div>Загрузка</div>}>
                    <CategoriesEdit getCategory={props.getCategoryThunkCreator}
                                    updateCategory={props.updateCategoryThunkCreator}
                                    categories={props.categories}/>
                </Suspense>
            </Route>
        </Switch>
    </div>
}

export default Admin