const CategoryResolver = require('./resolvers/Category.resolver')
const BookResolver = require('./resolvers/Book.resolver')

module.exports = {
	...CategoryResolver, ...BookResolver
}