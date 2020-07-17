import {Dispatch} from 'redux'
import {CategoryType} from './categories-reducer'
import {InferActionsTypes} from './store'
import {booksAPI} from '../api/books-api'


export type BookType = {
    _id: string
    name: string
    description: string
    author: string
    categoryId?: string
    category?: CategoryType
    year: number
}

type InitialStateType = {
    list: BookType[]
}
type ActionsTypes = InferActionsTypes<typeof actions>

const initialState: InitialStateType = {
    list: []
}


const categoriesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'books/CREATE_BOOK': {
            const list = state.list.map(item => Object.assign({}, item))

            list.push(action.book)

            return {...state, list}
        }
        case 'books/READ_BOOKS': {
            return {...state, list: action.books}
        }
        case 'books/UPDATE_BOOK': {
            const list = state.list.map(item => Object.assign({}, item))

            return {
                ...state,
                list: list.map(item => action.book._id === item._id ? {...action.book} : item)
            }
        }
        default: {
            return state
        }
    }
}

export const actions = {
    createBook: (book: BookType) => ({type: 'books/CREATE_BOOK', book} as const),
    readBooks: (books: BookType[]) => ({type: 'books/READ_BOOKS', books} as const),
    updateBook: (book: BookType) => ({type: 'books/UPDATE_BOOK', book} as const)
}

export const createBookThunkCreator = (book: BookType) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await booksAPI.createBook(book)

        dispatch(actions.createBook(response.data.createBook))
    } catch (e) {
        console.log(e)
    }
}

export const readBooksThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await booksAPI.readBooks()

        dispatch(actions.readBooks(response.data.readBooks))
    } catch (e) {
        console.log(e)
    }
}

export const readBookThunkCreator = (_id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await booksAPI.readBook(_id)

        return response.data.readBook
    } catch (e) {
        console.log(e)
    }
}

export const updateBookThunkCreator = (book: BookType) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await booksAPI.updateBook(book)

        dispatch(actions.updateBook(response.data.updateBook))
    } catch (e) {
        console.log(e)
    }
}

export default categoriesReducer