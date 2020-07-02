const shortId = require("shortid")
const Category = require("../../models/Category")
const Book = require("../../models/Book")

module.exports = {
	async addCategory({book}) {
		const newBook = new Book({book})

		return newBook.save()
	}
}