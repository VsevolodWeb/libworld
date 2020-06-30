const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	type CategoryType {
		id: String!
		name: String!
		description: String!
		subcategories: [CategoryType]
	}
	input CategoryInput {
		name: String!
		description: String!
		subcategoryId: String
	}

	type Mutation {
		addCategory(category: CategoryInput): CategoryType!
		removeCategory(id: String!): String!
		# updateCategory(category: CategoryInput!): CategoryType!
	}
	
	type Query {
		getCategories: [CategoryType!]!
		getCategory(id: String!): CategoryType!
	}
`)