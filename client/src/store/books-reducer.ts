import {Dispatch} from 'redux'
import {CategoryType} from './categories-reducer'
import {InferActionsTypes} from './store'
import {booksAPI} from '../api/books-api'
import {FormikErrors, FormikState} from 'formik'


export type BookType = {
    _id?: string
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


const booksReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

        case 'books/DELETE_BOOK': {
            return {...state, list: state.list.filter(item => item._id !== action._id)}
        }

        default: {
            return state
        }
    }
}

export const actions = {
    createBook: (book: BookType) => ({type: 'books/CREATE_BOOK', book} as const),
    readBooks: (books: BookType[]) => ({type: 'books/READ_BOOKS', books} as const),
    updateBook: (book: BookType) => ({type: 'books/UPDATE_BOOK', book} as const),
    deleteBook: (_id: string) => ({type: 'books/DELETE_BOOK', _id} as const)
}

export type createBookThunkCreatorType = (book: BookType, setErrors: (errors: FormikErrors<BookType>) => void, resetForm: (nextState?: Partial<FormikState<BookType>>) => void) => void
export const createBookThunkCreator: createBookThunkCreatorType = (book, setErrors, resetForm) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const newBook = await booksAPI.createBook(book)

        if (!newBook.errors) {
            dispatch(actions.createBook({...newBook.data.createBook}))
            resetForm()
        } else {
            setErrors({description: newBook.errors[0].message})
        }
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

export const readBookThunkCreator = (_id: string) => async () => {
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

export const deleteBookThunkCreator = (_id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await booksAPI.deleteBook(_id)

        dispatch(actions.deleteBook(response.data.deleteCategory))
    } catch (e) {
        console.log(e)
    }
}


export default booksReducer