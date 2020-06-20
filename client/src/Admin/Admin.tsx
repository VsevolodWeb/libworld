import React, {Suspense} from 'react'
import Categories from "./Categories/Categories"
import {Switch, Route, NavLink} from 'react-router-dom';
import Edit from "./Categories/Edit/Edit";
import {MapDispatchToProps, MapStateToProps} from "./AdminContainer";


type PropsType = MapStateToProps & MapDispatchToProps

const Admin: React.FC<PropsType> = props => {
    return <div>
        <Switch>
            <Route exact path="/admin/categories">
                <Suspense fallback={<div>Загрузка</div>}>
                    <Categories getCategories={props.getCategoriesThunkCreator}
                                removeCategory={props.removeCategoryThunkCreator}
                                addingCategory={props.addingCategoryThunkCreator}
                                categories={props.categories}
                    />
                </Suspense>
            </Route>
            <Route path="/admin/categories/:id">
                <Suspense fallback={<div>Загрузка</div>}>
                    <Edit getCategory={props.getCategoryThunkCreator} updateCategory={props.updateCategoryThunkCreator}/>
                </Suspense>
            </Route>
            <Route path="/">
                <Suspense fallback={<div>Загрузка</div>}>
                    <NavLink to={"/admin/categories"}>Жанры</NavLink>
                    <NavLink to={"/admin/books"}>Книги</NavLink>
                </Suspense>
            </Route>
        </Switch>
    </div>
}

export default Admin