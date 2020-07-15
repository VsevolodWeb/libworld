import {Dispatch} from 'redux'
import {InferActionsTypes} from './store'
import {categoriesAPI} from '../api/categories-api'
import {FormikErrors, FormikState} from 'formik'
import normalizeCategories from './helpers/normalizeCategories'


export type CategoryType = {
    _id?: string
    parentId?: string | null
    name: string
    description: string
}

export type CategoryOutputType = CategoryType & {
    subcategories?: CategoryType[]
    ancestors?: CategoryType[]
}

type InitialStateType = {
    list: CategoryOutputType[]
}
type ActionsTypes = InferActionsTypes<typeof actions>

const initialState: InitialStateType = {
    list: []
}


const categoriesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'categories/CREATE_CATEGORY': {
            const listCopy = normalizeCategories(state.list)
            const newCategory = {...action.category, subcategories: []}

            if(!action.category.parentId) {
                listCopy.push(newCategory)
            } else {
                listCopy.forEach(item => {
                    if (item._id === action.category.parentId) {
                        item.subcategories!.push(newCategory)
                    }
                })
            }

            return {...state, list: listCopy}
        }
        case 'categories/READ_CATEGORIES': {
            const r = normalizeCategories(action.categories)
            console.log(r)
            return {...state, list: r}
        }
        case 'categories/REMOVE_CATEGORY': {
            const listCopy = state.list.map(item => Object.assign({}, item))

            if (action.parentId) {
                const categoryIdx = listCopy.findIndex(item => item._id === action.parentId)

                listCopy[categoryIdx].ancestors = listCopy[categoryIdx].ancestors!
                    .filter(item => item._id !== action.id)

                return {...state, list: listCopy}
            } else {
                return {...state, list: listCopy.filter(item => item._id !== action.id)}
            }
        }
        case 'categories/UPDATE_CATEGORY': {
            // let listCopy = state.list.map(item => Object.assign({}, item))
            // const candidateIdx = listCopy.findIndex((el => el._id === action.category._id))
            // if (candidateIdx === -1) {
            //     listCopy = listCopy.map(category => {
            //         const candidate = category.ancestors!.filter(item => item._id === action.category._id)
            //         if (candidate) {
            //             return {
            //                 ...category,
            //                 subcategories: category.ancestors!
            //                     .map(item => ({
            //                         ...item,
            //                         name: action.category.name,
            //                         description: action.category.description
            //                     }))
            //             }
            //         } else {
            //             return category
            //         }
            //     })
            // } else {
            //     listCopy[candidateIdx].name = action.category.name
            //     listCopy[candidateIdx].description = action.category.description
            // }

            return {...state}
        }
        default: {
            return state
        }
    }
}

export const actions = {
    createCategory: (category: CategoryType) => ({type: 'categories/CREATE_CATEGORY', category} as const),
    readCategories: (categories: CategoryOutputType[]) => ({type: 'categories/READ_CATEGORIES', categories} as const),
    removeCategory: (id: string, parentId: string) => ({type: 'categories/REMOVE_CATEGORY', id, parentId} as const),
    updateCategory: (category: CategoryType) => ({type: 'categories/UPDATE_CATEGORY', category} as const)
}

export type createCategoryThunkCreatorType = (category: CategoryType, setErrors: (errors: FormikErrors<CategoryType>) => void, resetForm: (nextState?: Partial<FormikState<CategoryType>>) => void) => void
export const createCategoryThunkCreator: createCategoryThunkCreatorType = (category, setErrors, resetForm) =>
    async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            const newCategory = await categoriesAPI.createCategory(category)

            if (!newCategory.errors) {
                dispatch(actions.createCategory({...newCategory.data.createCategory, parentId: category.parentId}))
                resetForm()
            } else {
                setErrors({description: newCategory.errors[0].message})
            }
        } catch (e) {
            console.log(e)
        }
    }

export const readCategoriesThunkCreator = () => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.readCategories()

        dispatch(actions.readCategories(response.data.readCategories))
    } catch (e) {
        console.log(e)
    }
}

export const readCategoryThunkCreator = (id: string) => async () => {
    try {
        const response = await categoriesAPI.readCategory(id)

        return response.data.readCategory
    } catch (e) {
        console.log(e)
    }
}

export const removeCategoryThunkCreator = (id: string, parentId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.removeCategory(id)

        dispatch(actions.removeCategory(response.data.removeCategory, parentId))
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

export default categoriesReducer