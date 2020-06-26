import {Dispatch} from "redux";
import {InferActionsTypes} from "./store";
import {categoriesAPI} from "../api/categories-api";
import {FormikErrors, FormikState} from "formik";


export type CategoryType = {
    id?: string
    name: string
    description: string
}
export type CategoryInputType = CategoryType & {
    parentId: string
}

export type CategoryOutputType = CategoryType & {
    subcategories?: CategoryType[]
}

type InitialStateType = {
    list: CategoryOutputType[]
}
type ActionsTypes = InferActionsTypes<typeof actions>

const initialState: InitialStateType = {
    list: []
};


const categoriesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "categories/ADD_CATEGORY": {
            const stateCopy = Object.assign({}, state);
            const candidateId = stateCopy.list.findIndex(item => item.id === action.category.id)

            return candidateId ? {...stateCopy, list: [...stateCopy.list, action.category]} : stateCopy
        }
        case "categories/GET_CATEGORIES": {
            return {...state, list: action.categories}
        }
        case "categories/REMOVE_CATEGORY": {
            //return {...state, list: state.list.filter(item => item.id !== action.id)}
        }
        case "categories/UPDATE_CATEGORY": {
            // const stateCopy = Object.assign({}, state);
            // const candidateId = stateCopy.list.findIndex((el => el.id === action.category.id))
            // stateCopy.list[candidateId] = action.category

            return state
        }
        default: {
            return state;
        }
    }
};

export const actions = {
    addCategory: (category: CategoryType) => ({type: 'categories/ADD_CATEGORY', category} as const),
    getCategories: (categories: CategoryOutputType[]) => ({type: 'categories/GET_CATEGORIES', categories} as const),
    removeCategory: (id: string) => ({type: 'categories/REMOVE_CATEGORY', id} as const),
    updateCategory: (category: CategoryType) => ({type: 'categories/UPDATE_CATEGORY', category} as const)
}

export type addingCategoryThunkCreatorType = (category: CategoryInputType, setErrors: (errors: FormikErrors<CategoryInputType>) => void, resetForm: (nextState?: Partial<FormikState<CategoryInputType>>) => void) => void
export const addingCategoryThunkCreator: addingCategoryThunkCreatorType = (category, setErrors, resetForm) =>
    async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            const newCategory = await categoriesAPI.addCategory(category)
            console.log(category)

            if (!newCategory.errors) {
                dispatch(actions.addCategory({...newCategory.data.addCategory}))
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

        //dispatch(actions.addCategory(response.data.getCategory))

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

export const updateCategoryThunkCreator = (category: CategoryType) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.updateCategory(category)

        dispatch(actions.updateCategory(response.data.updateCategory))
    } catch (e) {
        console.log(e)
    }
}

export default categoriesReducer;