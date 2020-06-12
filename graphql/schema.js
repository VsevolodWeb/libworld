const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	type CategoryType {
		name: String!
		description: String!
	}
	input CategoryInput {
		name: String!
		description: String!
	}

	type Mutation {
		addCategory(category: CategoryInput!): CategoryType!
	}
	
	type Query {
		hello: String
	}
`)