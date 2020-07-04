const types = `
	input BookInput {
		name: String!
		description: String!
		author: String!
		categoryId: String!
		year: Int!
	}
	
	type BookType {
		id: String!
		name: String!
		description: String!
		author: String!
		category: CategoryType!
		year: Int!
	}
`

const query = `
	readBooks: [BookType!]!
	readBook(id: String!): BookType!
`

const mutation = `
	createBook(book: BookInput!): BookType!
`

module.exports = {
	types, query, mutation
}