const fs = require("fs")
const shortId = require('shortid')
const Book = require("../../models/Book")
const {readCategory} = require("../resolvers/category.resolver")
const decodeBase64Image = require("../../helpers/decodeBase64Image")

const handleError = (error) => {
	console.error(`Error ${error}\n${error.stack}`)
}

module.exports = {
	async createBook({book}) {
		try {
			const category = await readCategory({id: book.categoryId})

			if (!category) return new Error("Такой категории не существует")

			const coverWrapper = decodeBase64Image(book.cover)
			const coverURL = `books-images/${shortId.generate()}.jpg`

			const newBook = new Book({
				...book, cover: coverURL, category
			})

			await newBook.save((err, book) => {
				console.log(err, book)
				return 2
			})
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