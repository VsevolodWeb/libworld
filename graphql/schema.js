const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	input CategoryInput {
		name: String!
		description: String!
	}
	type CategoryType {
		name: String!
		description: String!
	}

	type Mutation {
		addCategory(category: CategoryInput!): CategoryType
	}
`)