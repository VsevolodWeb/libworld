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
        return api<ApiType<"addCategory", CategoryType>>(query)
    },
    getCategories() {
        const query = `
            query {
              getCategories {
                id name, description
              }
            }
        `
        return api<ApiType<"getCategories", CategoryType[]>>(query)
    },
    getCategoryId(name: string) {
        const query = `
            query {
              getCategoryId("${name}") {
                id
              }
            }
        `
        return api<ApiType<"getCategoryId", string>>(query).then(response => {
            console.log(response)
            return response.data.getCategoryId
        })
    }
}