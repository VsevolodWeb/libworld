import api, {ApiType} from "./api"
import {CategoryInputType, CategoryOutputType, CategoryType} from "../store/categories-reducer"

export const categoriesAPI = {
    addCategory(category: CategoryInputType) {
        const query = `
            mutation {
                addCategory(category: {name: "${category.name}",
                                       description: "${category.description}",
                                       parentId: "${category.parentId}"}) {
                    id name description
                }
            }
        `
        return api<ApiType<"addCategory", CategoryType>>(query)
    },
    getCategories() {
        const query = `
            query {
              getCategories {
                id name description
                subcategories {
                  id name description
                }
              }
            }
        `
        return api<ApiType<"getCategories", CategoryOutputType[]>>(query)
    },
    getCategory(id: string) {
        const query = `
            query {
              getCategory(id: "${id}") {
                id name description
              }
            }
        `
        return api<ApiType<"getCategory", CategoryType>>(query)
    },
    getCategoryId(name: string) {
        const query = `
            query {
              getCategoryId(name: "${name}")
            }
        `
        return api<ApiType<"getCategoryId", string>>(query)
    },
    removeCategory(id: String) {
        const query = `
            mutation {
                removeCategory(id: "${id}") {
                    id
                }
            }
        `
        return api<ApiType<"removeCategory", CategoryType>>(query)
    },
    updateCategory(category: CategoryType) {
        const query = `
            mutation {
                updateCategory(category: {id: "${category.id}", name: "${category.name}", description: "${category.description}"}) {
                    id name description
                }
            }
        `
        return api<ApiType<"updateCategory", CategoryType>>(query)
    },
}