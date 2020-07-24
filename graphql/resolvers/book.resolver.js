const Book = require("../../models/Book")
const {readCategory} = require("../resolvers/category.resolver")

module.exports = {
	async createBook({book}) {
		try {
			const category = await readCategory({id: book.categoryId})

			if (!category) return new Error("Такой категории не существует")

			const newBook = new Book({
				...book, category
			})

			return await newBook.save()
		} catch (e) {
			throw new Error(e)
		}
	},
	async readBooks() {
		try {
			return await Book.find().populate('category')
		} catch (e) {
			throw new Error(e)
		}
	},
	async readBook({_id}) {
		try {
			return await Book.findById({_id}).populate('category')
		} catch (e) {
			throw new Error(e)
		}
	},
	async updateBook({book: {_id, name, description, author, year, categoryId}}) {
		try {
			return await Book.findByIdAndUpdate(
				_id,
				{$set: {_id, name, description, author, year, category: categoryId}},
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