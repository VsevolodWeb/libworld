const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	type CategoryType {
		id: String!
		name: String!
		description: String!
		subcategories: [CategoryType!]
	}
	input CategoryInput {
		id: String
		name: String!
		description: String!
		parentId: String
	}

	type Mutation {
		addCategory(category: CategoryInput): CategoryType!
		removeCategory(id: String!): CategoryType
		updateCategory(category: CategoryInput!): CategoryType!
	}
	
	type Query {
		getCategories: [CategoryType!]!
		getCategoryId(name: String!): String
		getCategory(id: String!): CategoryType!
	}
`)