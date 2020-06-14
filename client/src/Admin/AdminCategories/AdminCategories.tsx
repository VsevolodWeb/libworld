import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import {addingCategoryThunkCreator, CategoryType, getCategoriesThunkCreator} from "../../redux/categories-reducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {useEffect} from "react";

type MapStateToProps = {
    categories: CategoryType[]
}
type MapDispatchToProps = {
    addingCategoryThunkCreator: (category: CategoryType) => void
    getCategoriesThunkCreator: () => void
}
type OwnProps = {}
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps

const AdminCategories: React.FC<PropsType> = props => {
    useEffect(() => {
        props.getCategoriesThunkCreator()
    }, [props])

    return (
        <div>
            <h1>Категории</h1>
            <Formik
                initialValues={{name: '', description: ''}}
                onSubmit={(values) => {
                    props.addingCategoryThunkCreator(values);
                }}
            >
                {() => (
                    <Form>
                        <Field name="name"/>
                        <Field name="description"/>
                        <button>Добавить новую категорию!</button>
                    </Form>
                )}
            </Formik>
            <table>
                {props.categories.map(item => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                    </tr>
                ))}
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