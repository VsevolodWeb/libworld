import api from "./api"
import {CategoryType} from "../redux/categories-reducer"

export const categoriesAPI = {
    addCategory(category: CategoryType) {
        const query = `
            mutation {
                addCategory(category: ${category}) {
                    name description
                }
            }
        `
        return api<CategoryType>(query);
    }
}