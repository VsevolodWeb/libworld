import {Dispatch} from "redux";
import {InferActionsTypes} from "./store";
import {categoriesAPI} from "../api/categories-api";

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
        default: {
            return state;
        }
    }
};

export const actions = {
    addCategory: (category: CategoryType) => ({type: 'categories/ADD_CATEGORY', category} as const),
}

export const addingCategoryThunkCreator = (category: CategoryType) => async (dispatch: Dispatch<ActionsTypes>) => {
    try {
        const response = await categoriesAPI.addCategory(category)
        dispatch(actions.addCategory(response))
    } catch (e) {
        console.log(e);
    }
}

export default categoriesReducer;