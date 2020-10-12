import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import categoriesReducer from './categories-reducer'
import booksReducer from './books-reducer'

const rootReducer = combineReducers({
	categories: categoriesReducer,
	books: booksReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store