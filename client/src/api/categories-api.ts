import api, {ApiType} from "./api"
import {CategoryInputType, CategoryOutputType, CategoryType} from "../store/categories-reducer"

export const categoriesAPI = {
    addCategory(category: CategoryInputType) {
        const query = `
            mutation {
                createCategory(category: {
                    name: "${category.name}",
                    description: "${category.description}"
                    ${category.parentId ? `, parentId: "${category.parentId}"` : ''}
                }) {
                    _id name description
                }
            }
        `
        return api<ApiType<"addCategory", CategoryType>>(query)
    },
    getCategories() {
        const query = `
            query {
              getCategories {
                _id name description
                ancestors {
                  _id name description
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
    removeCategory(id: string) {
        const query = `
            mutation {
                removeCategory(id: "${id}")
            }
        `
        return api<ApiType<"removeCategory", string>>(query)
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