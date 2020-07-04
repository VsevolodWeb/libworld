const shortId = require("shortid")
const Book = require("../../models/Book")
const Category = require("../../models/Category")
const {getCategory} = require("../resolvers/category.resolver")

module.exports = {
	async createBook({book}) {
		try {
			const category = await getCategory({id: book.categoryId})

			if(!category) return new Error("Такой категории не существует")

			const newBook = new Book({
				...book,
				id: shortId(),
				category: category._id
			})

			return newBook.save()
		} catch (e) {
			throw new Error(e)
		}
	},
	async readBooks() {
		try {
			return await Book.find()
		} catch (e) {
			throw new Error(e)
		}
	},
	async readBook({id}) {
		try {
			const candidate = await Book.findOne({id}).populate('category')

			console.log(candidate)

			if(!candidate) return new Error("Книга не найдена")

			return candidate
		} catch (e) {
			throw new Error(e)
		}
	},
}