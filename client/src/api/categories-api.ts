import api from "./api"
import {CategoryType} from "../redux/categories-reducer"

export const categoriesAPI = {
    addCategory(category: CategoryType) {
        const query = `
            query {
                addCategory(${category}) {
                    name description
                }
            }
        `
        return api<CategoryType>(query);
    }
}