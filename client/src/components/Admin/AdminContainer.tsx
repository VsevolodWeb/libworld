import React from "react"
import Admin from "./Admin";
import {
    createCategoryThunkCreatorType,
    CategoryOutputType,
    CategoryType,
    createCategoryThunkCreator,
    readCategoryThunkCreator,
    removeCategoryThunkCreator,
    updateCategoryThunkCreator,
    readCategoriesThunkCreator
} from '../../store/categories-reducer'
import {AppStateType} from "../../store/store";
import {connect} from "react-redux";

type MapStateToProps = {
    categories: CategoryOutputType[]
}
type MapDispatchToProps = {
    createCategoryThunkCreator: createCategoryThunkCreatorType
    readCategoriesThunkCreator: () => void
    removeCategoryThunkCreator: (id: string, parentId: string) => void
    readCategoryThunkCreator: (id: string) => Promise<any>
    updateCategoryThunkCreator: (category: CategoryType) => void
}
type OwnProps = {}
export type PropsType = MapStateToProps & MapDispatchToProps & OwnProps


const AdminContainer: React.FC<PropsType> = props => {
    return <Admin {...props}/>
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    categories: state.categories.list
})

export default connect(
    mapStateToProps,
    {
        createCategoryThunkCreator,
        readCategoriesThunkCreator,
        removeCategoryThunkCreator,
        readCategoryThunkCreator,
        updateCategoryThunkCreator
    }
)(AdminContainer);