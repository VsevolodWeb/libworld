const types = `
	type CategoryType {
		_id: String!
		name: String!
		description: String!
		ancestors: [CategoryType]
	}
	input CategoryInput {
		_id: String
		name: String!
		description: String!
		parentId: String
	}
`

const query = `
	readCategories: [CategoryType!]!
	readCategory(id: String!): CategoryType!
`

const mutation = `
	createCategory(category: CategoryInput!): CategoryType!
	deleteCategory(id: String!): String!
	updateCategory(category: CategoryInput!): CategoryType!
`

module.exports = {
	types, query, mutation
}