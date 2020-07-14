import api, {ApiType} from "./api"
import {CategoryOutputType, CategoryType} from "../store/categories-reducer"

export const categoriesAPI = {
    createCategory(category: CategoryType) {
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
        return api<ApiType<"createCategory", CategoryType>>(query)
    },
    getCategories() {
        const query = `
            query {
              readCategories {
                _id parentId name description
                ancestors {
                  _id name description
                }
              }
            }
        `
        return api<ApiType<"readCategories", CategoryOutputType[]>>(query)
    },
    getCategory(id: string) {
        const query = `
            query {
              readCategory(id: "${id}") {
                _id name description
              }
            }
        `
        return api<ApiType<"readCategory", CategoryType>>(query)
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
                updateCategory(category: {id: "${category._id}", name: "${category.name}", description: "${category.description}"}) {
                    id name description
                }
            }
        `
        return api<ApiType<"updateCategory", CategoryType>>(query)
    },
}