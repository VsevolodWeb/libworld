import React from "react"
import Admin from "./Admin";
import {
    addingCategoryThunkCreator,
    addingCategoryThunkCreatorType,
    CategoryType,
    getCategoriesThunkCreator, getCategoryThunkCreator, removeCategoryThunkCreator, updateCategoryThunkCreator
} from "../../store/categories-reducer";
import {AppStateType} from "../../store/store";
import {connect} from "react-redux";

export type MapStateToProps = {
    categories: CategoryType[]
}
export type MapDispatchToProps = {
    addingCategoryThunkCreator: addingCategoryThunkCreatorType
    getCategoriesThunkCreator: () => void
    removeCategoryThunkCreator: (id: string) => void
    getCategoryThunkCreator: (id: string) => Promise<any>
    updateCategoryThunkCreator: (category: CategoryType) => void
}
type OwnProps = {}
type PropsType = MapStateToProps & MapDispatchToProps & OwnProps


const AdminContainer: React.FC<PropsType> = props => {
    return <Admin {...props}/>
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    categories: state.categories.list
})

export default connect(
    mapStateToProps,
    {
        addingCategoryThunkCreator,
        getCategoriesThunkCreator,
        removeCategoryThunkCreator,
        getCategoryThunkCreator,
        updateCategoryThunkCreator
    }
)(AdminContainer);