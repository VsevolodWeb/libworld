const {buildSchema} = require("graphql")

module.exports = buildSchema(`
	type SubCategoryType {
		id: String!
		name: String!
		description: String!
	}
	type CategoryType {
		id: String!
		name: String!
		description: String!
		subcategories: [SubCategoryType!]!
	}
	input CategoryInput {
		id: String
		name: String!
		description: String!
		parentId: String
	}

	type Mutation {
		addCategory(category: CategoryInput): CategoryType!
		removeCategory(id: String!, parentId: String!): String!
		updateCategory(category: CategoryInput!): CategoryType!
	}
	
	type Query {
		getCategories: [CategoryType!]
		getCategoryId(name: String!): String
		getCategory(id: String!): CategoryType!
	}
`)