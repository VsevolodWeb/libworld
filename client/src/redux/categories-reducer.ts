import {Dispatch} from "redux";
import {InferActionsTypes} from "./store";

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

const actions = {
	addCategory: (category: CategoryType) => ({type: 'categories/ADD_CATEGORY', category} as const),
}

export const setUserPhotoThunkCreator = (photo: File) => async (dispatch: Dispatch<ActionsTypes>) => {
    const response = await profileAPI.updateUserPhoto(photo)

    if(response.resultCode === 0) {
        dispatch(actions.setUserPhoto(response.data.photos))
    }
}

export default categoriesReducer;