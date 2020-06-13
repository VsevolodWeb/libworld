import * as React from 'react';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import {addingCategoryThunkCreator, CategoryType} from "../../redux/categories-reducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";

type MapStateToProps = {}
type MapDispatchToProps = {
    addingCategoryThunkCreator: (category: CategoryType) => void
}
type OwnProps = {}
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps

const AddingCategoryForm: React.FC<PropsType> = props => {
    const initialValues: CategoryType = {name: '', description: ''};
    return (
        <div>
            <h1>My Example</h1>
            <Formik
                initialValues={initialValues}
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
        </div>
    );
};

const mapStateToProps = (): MapStateToProps => ({})

export default connect<MapStateToProps, MapDispatchToProps, OwnProps, AppStateType>(
    mapStateToProps,
    {addingCategoryThunkCreator}
)(AddingCategoryForm);