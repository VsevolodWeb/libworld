const shortId = require("shortid")
const Book = require("../../models/Book")
const Category = require("../../models/Category")
const {readCategory} = require("../resolvers/category.resolver")

module.exports = {
	async createBook({book}) {
		try {
			const category = await readCategory({id: book.categoryId})

			if (!category) return new Error("Такой категории не существует")

			const newBook = new Book({
				...book,
				id: shortId(),
				category: category._id
			})

			return await newBook.save()
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
	async updateBook({book: {_id, name, description, author, year, categoryId}}) {
		try {
			return await Book.findByIdAndUpdate(
				_id,
				{$set: {_id, name, description, author, year, categoryId}},
				{new: true}
			)
		} catch (e) {
			throw new Error(e)
		}
	},
	async deleteBook({_id}) {
		try {
			await Book.findByIdAndRemove(_id)

			return _id
		} catch (e) {
			throw new Error(e)
		}
	},
}