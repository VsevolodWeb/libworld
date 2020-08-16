const types = `
	scalar Upload

	type BookType {
		_id: String!
		name: String!
		description: String!
		text: String
		cover: String
		author: String!
		category: CategoryType!
		year: Int!
	}

	input BookInput {
		_id: String
		name: String!
		description: String!
		text: String
		cover: Upload
		author: String!
		categoryId: String!
		year: Int!
	}
`

const query = `
	readBooks: [BookType!]!
	readBook(_id: String!): BookType!
`

const mutation = `
	createBook(book: BookInput!): BookType!
	updateBook(book: BookInput!): BookType!
	deleteBook(_id: String!): String!
`

module.exports = {
	types, query, mutation
}