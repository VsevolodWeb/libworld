import api, {ApiType} from "./api"
import {CategoryType} from "../redux/categories-reducer"

export const categoriesAPI = {
    addCategory(category: CategoryType) {
        const query = `
            mutation {
                addCategory(category: {name: "${category.name}", description: "${category.description}"}) {
                    name description
                }
            }
        `
        return api<ApiType<"addCategory", CategoryType>>(query);
    },
    getCategories() {
        const query = `
            query {
              getCategories {
                name, description
              }
            }
        `
        return api<ApiType<"getCategories", CategoryType[]>>(query);
    }
}