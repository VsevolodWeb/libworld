const types = `
	type CategoryType {
		name: String!
		description: String!
	}
	input CategoryInput {
		name: String!
		description: String!
	}
`

const query = `
	getCategories: [CategoryType!]!
	getCategory(id: String!): CategoryType!
`

const mutation = `
	createCategory(category: CategoryInput!): CategoryType!
	removeCategory(id: String!): String!
	updateCategory(category: CategoryInput!): CategoryType!
`

module.exports = {
	types, query, mutation
}