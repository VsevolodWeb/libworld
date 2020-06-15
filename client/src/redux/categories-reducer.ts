import {Dispatch} from "redux";
import {InferActionsTypes} from "./store";
import {categoriesAPI} from "../api/categories-api";
import {FormikErrors} from "formik";

export type CategoryType = {
    name: string
    description: string
}

type InitialStateType = {
    list: CategoryType[]
}
type ActionsTypes = InferActionsTypes<typeof actions>

const initialState: InitialStateType = {
    list: []
};


const categoriesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "categories/ADD_CATEGORY": {
            return {...state, list: [...state.list, action.category]}
        }
        case "categories/GET_CATEGORIES": {
            return {...state, list: [...action.categories]}
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    addCategory: (category: CategoryType) => ({type: 'categories/ADD_CATEGORY', category} as const),
    getCategories: (categories: CategoryType[]) => ({type: 'categories/GET_CATEGORIES', categories} as const),
}

export type addingCategoryThunkCreatorErrorsType = (errors: FormikErrors<CategoryType>) => void;
export const addingCategoryThunkCreator = (category: CategoryType, setErrors: addingCategoryThunkCreatorErrorsType) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.addCategory(category)
        dispatch(actions.addCategory(response))
    } catch (e) {
        console.log(e)
        setErrors({description: e.message})
    }
}

export const getCategoriesThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.getCategories()
        dispatch(actions.getCategories(response))
    } catch (e) {
        console.log(e)
    }
}

export default categoriesReducer;