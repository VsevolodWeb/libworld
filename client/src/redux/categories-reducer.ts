import {Dispatch} from "redux";
import {InferActionsTypes} from "./store";
import {categoriesAPI} from "../api/categories-api";
import {FormikErrors, FormikState} from "formik";

export type CategoryType = {
    id?: string
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
        case "categories/REMOVE_CATEGORY": {
            return {...state, list: state.list.filter(item => item.id !== action.id)}
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    addCategory: (category: CategoryType) => ({type: 'categories/ADD_CATEGORY', category} as const),
    getCategories: (categories: CategoryType[]) => ({type: 'categories/GET_CATEGORIES', categories} as const),
    removeCategory: (id: string) => ({type: 'categories/REMOVE_CATEGORY', id} as const)
}

export type addingCategoryThunkCreatorType = (category: CategoryType, setErrors: (errors: FormikErrors<CategoryType>) => void, resetForm: (nextState?: Partial<FormikState<CategoryType>>) => void) => void
export const addingCategoryThunkCreator: addingCategoryThunkCreatorType = (category, setErrors, resetForm) =>
    async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            const newCategory = await categoriesAPI.addCategory(category)

            if (!newCategory.errors) {
                const categoryId = await categoriesAPI.getCategoryId(newCategory.data.addCategory.name)

                dispatch(actions.addCategory({...newCategory.data.addCategory, id: categoryId.data.getCategoryId}))
                resetForm()
            } else {
                setErrors({description: newCategory.errors[0].message})
            }
        } catch (e) {
            console.log(e)
        }
    }

export const getCategoriesThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.getCategories()
        dispatch(actions.getCategories(response.data.getCategories))
    } catch (e) {
        console.log(e)
    }
}

export const getCategoryThunkCreator = (id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.getCategory(id)

        dispatch(actions.addCategory(response.data.getCategory))

        return response.data.getCategory
    } catch (e) {
        console.log(e)
    }
}

export const removeCategoryThunkCreator = (id: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.removeCategory(id)

        dispatch(actions.removeCategory(response.data.removeCategory.id!))
    } catch (e) {
        console.log(e)
    }
}

export default categoriesReducer;