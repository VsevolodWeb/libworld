import api, {ApiType} from './api'
import {CategoryOutputType, CategoryType} from '../store/categories-reducer'

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
		return api<ApiType<'createCategory', CategoryType>>(query)
	},
	readCategories() {
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
		const functionName = this.readCategories.name
		type functionNameType = typeof functionName
		return api<ApiType<functionNameType, CategoryOutputType[]>>(query)
	},
	readCategory(_id: string) {
		const query = `
            query {
              readCategory(id: "${_id}") {
                _id name description parentId
              }
            }
        `
		return api<ApiType<'readCategory', CategoryType>>(query)
	},
	updateCategory(category: CategoryType) {
		const parentId = category.parentId ? `"${category.parentId}"` : null
		const query = `
            mutation {
                updateCategory(category: {_id: "${category._id}", name: "${category.name}", description: "${category.description}", parentId: ${parentId}}) {
                    _id name description
                }
            }
        `
		return api<ApiType<'updateCategory', CategoryType>>(query)
	},
	deleteCategory(id: string) {
		const query = `
            mutation {
                deleteCategory(id: "${id}")
            }
        `
		return api<ApiType<'deleteCategory', string>>(query)
	}
}