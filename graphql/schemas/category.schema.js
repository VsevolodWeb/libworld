const types = `
	type CategoryType {
		id: String!
		name: String!
		description: String!
		subcategories: [CategoryType]
	}
	input CategoryInput {
		id: String
		name: String!
		description: String!
		parentId: String
	}
`

const query = `
	getCategories: [CategoryType!]!
	getCategory(id: String!): CategoryType!
`

const mutation = `
	addCategory(category: CategoryInput): CategoryType!
	removeCategory(id: String!): String!
	updateCategory(category: CategoryInput!): CategoryType!
`

module.exports = {
	types, query, mutation
}