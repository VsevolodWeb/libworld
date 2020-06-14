import api from "./api"
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
        return api<CategoryType>(query);
    },
    getCategories() {
        const query = `
            query {
              getCategories {
                name, description
              }
            }
        `
        return api<CategoryType[]>(query);
    }
}