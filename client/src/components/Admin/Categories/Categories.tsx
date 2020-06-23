import React, {useEffect} from 'react';
import {Field, Form, Formik,} from 'formik';
import * as Yup from 'yup';
import {addingCategoryThunkCreatorType, CategoryType} from "../../../store/categories-reducer";
import {NavLink} from "react-router-dom";

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
        <div>
            <h1>Категории</h1>
            <Formik
                initialValues={{name: '', description: ''}}
                onSubmit={(values, {setErrors, resetForm}) => {
                    props.addingCategory(values, setErrors, resetForm)
                }}
                validationSchema={CategorySchema}
            >
                {({errors, touched}) => (
                    <Form>
                        <div>
                            <Field name="name"/>
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="description" as="textarea"/>
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
    );
};

export default Categories;