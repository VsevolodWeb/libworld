import React, {useEffect} from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import {connect} from "react-redux";
import {
    addingCategoryThunkCreator, addingCategoryThunkCreatorType,
    CategoryType,
    getCategoriesThunkCreator
} from "../../redux/categories-reducer";
import {AppStateType} from "../../redux/store";


type MapStateToProps = {
    categories: CategoryType[]
}
type MapDispatchToProps = {
    addingCategoryThunkCreator: addingCategoryThunkCreatorType
    getCategoriesThunkCreator: () => void
}
type OwnProps = {}
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps


const addingCategorySchema = Yup.object().shape<CategoryType>({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});


const AdminCategories: React.FC<PropsType> = props => {
    const getCategories = props.getCategoriesThunkCreator;

    useEffect(() => {
        getCategories();
    }, [getCategories])

    return (
        <div>
            <h1>Категории</h1>
            <Formik
                initialValues={{name: '', description: ''}}
                onSubmit={(values, {setErrors}) => {
                    props.addingCategoryThunkCreator(values, setErrors)
                }}
                validationSchema={addingCategorySchema}
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
                            <Field name="description"/>
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
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    categories: state.categories.list
})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(
    mapStateToProps,
    {addingCategoryThunkCreator, getCategoriesThunkCreator}
)(AdminCategories);