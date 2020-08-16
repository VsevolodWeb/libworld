const {buildSchema} = require("graphql")
const category = require("./schemas/category.schema")
const book = require("./schemas/book.schema")

module.exports = buildSchema(`
	${category.types}
	${book.types}

	type Mutation {
		${category.mutation}
		${book.mutation}
	}
	
	type Query {
		${category.query}
		${book.query}
	}
`, {})