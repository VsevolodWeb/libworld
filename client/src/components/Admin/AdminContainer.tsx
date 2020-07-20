import React from "react"
import Admin from "./Admin";
import {
    createCategoryThunkCreatorType,
    CategoryOutputType,
    CategoryType,
    createCategoryThunkCreator,
    readCategoriesThunkCreator,
    readCategoryThunkCreator,
    deleteCategoryThunkCreator,
    updateCategoryThunkCreator
} from '../../store/categories-reducer'
import {
    BookType,
    createBookThunkCreator,
    readBooksThunkCreator,
    readBookThunkCreator,
    deleteBookThunkCreator,
    updateBookThunkCreator
} from '../../store/books-reducer'
import {AppStateType} from "../../store/store";
import {connect} from "react-redux";

type MapStateToProps = {
    categories: CategoryOutputType[]
    books: BookType[]
}
type MapDispatchToProps = {
    createCategoryThunkCreator: createCategoryThunkCreatorType
    readCategoriesThunkCreator: () => void
    readCategoryThunkCreator: (_id: string) => Promise<any>
    updateCategoryThunkCreator: (category: CategoryType) => void
    deleteCategoryThunkCreator: (_id: string, parentId: string) => void

    createBookThunkCreator: (book: BookType) => void
    readBooksThunkCreator: () => void
    readBookThunkCreator: (_id: string) => Promise<any>
    updateBookThunkCreator: (book: BookType) => void
    deleteBookThunkCreator: (_id: string) => void
}
type OwnProps = {}
export type PropsType = MapStateToProps & MapDispatchToProps & OwnProps


const AdminContainer: React.FC<PropsType> = props => {
    return <Admin {...props}/>
}

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    categories: state.categories.list,
    books: state.books.list
})

export default connect(
    mapStateToProps,
    {
        createCategoryThunkCreator,
        readCategoriesThunkCreator,
        readCategoryThunkCreator,
        updateCategoryThunkCreator,
        deleteCategoryThunkCreator,

        createBookThunkCreator,
        readBooksThunkCreator,
        readBookThunkCreator,
        updateBookThunkCreator,
        deleteBookThunkCreator
    }
)(AdminContainer);