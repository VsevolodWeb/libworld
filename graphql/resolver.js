const CategoryResolver = require('./resolvers/category.resolver')
const BookResolver = require('./resolvers/book.resolver')

module.exports = {
	...CategoryResolver, ...BookResolver
}