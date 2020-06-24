import React, {useEffect, Suspense} from 'react';
import {NavLink, Switch, Route} from "react-router-dom";
import {Field, Form, Formik,} from 'formik';
import * as Yup from 'yup';
import s from "./Categories.module.sass"
import {addingCategoryThunkCreatorType, CategoryType} from "../../../store/categories-reducer";

import CategoriesEdit from "./CategoriesEdit/CategoriesEdit";

export const CategorySchema = Yup.object().shape<CategoryType>({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});


type PropsType = {
    getCategories: () => void
    removeCategory: (id: string) => void
    addingCategory: addingCategoryThunkCreatorType
    categories: CategoryType[]
    getCategory: (id: string) => Promise<CategoryType>
    updateCategory: (category: CategoryType) => void
}

const Categories: React.FC<PropsType> = props => {
    const getCategories = props.getCategories;

    useEffect(() => {
        getCategories();
    }, [getCategories])

    const removeCategory = (id: string) => {
        props.removeCategory(id)
    }

    return (
        <Switch>
            <Route exact path="/admin/categories">
                <div>
                    <h1 className="title title_lg">Категории</h1>
                    <Formik
                        initialValues={{name: '', description: ''}}
                        onSubmit={(values, {setErrors, resetForm}) => {
                            props.addingCategory(values, setErrors, resetForm)
                        }}
                        validationSchema={CategorySchema}
                    >
                        {({errors, touched}) => (
                            <Form className={"form " + s.form}>
                                <div>
                                    <Field name="name" className="formElement"/>
                                    {errors.name && touched.name ? (
                                        <div>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <Field name="description" as="textarea" className="formElement"/>
                                    {errors.description && touched.description ? (
                                        <div>{errors.description}</div>
                                    ) : null}
                                </div>
                                <button>Добавить новую категорию!</button>
                            </Form>
                        )}
                    </Formik>
                    <table>
                        <tbody>
                        {props.categories.map((item, key) => (
                            <tr key={key}>
                                <td>
                                    <NavLink to={`/admin/categories/${item.id}`}>{item.name}</NavLink>
                                </td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => {
                                        removeCategory(item.id!)
                                    }}>Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Route>
            <Route path="/admin/categories/:id">
                <Suspense fallback={<div>Загрузка</div>}>
                    <CategoriesEdit getCategory={props.getCategory}
                                    updateCategory={props.updateCategory}/>
                </Suspense>
            </Route>
        </Switch>
    );
};

export default Categories;