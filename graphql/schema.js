const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	type CategoryType {
		id: String!
		name: String!
		description: String!
	}
	input CategoryInput {
		id: String
		name: String!
		description: String!
	}

	type Mutation {
		addCategory(category: CategoryInput!): CategoryType!
		removeCategory(id: String!): Int!
	}
	
	type Query {
		getCategories: [CategoryType!]!
		getCategoryId(name: String!): String!
	}
`)