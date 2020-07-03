const shortId = require("shortid")
const Book = require("../../models/Book")
const Category = require("../../models/Category")

module.exports = {
	async addBook({book}) {

		const category = await Category.findOne({"subcategories.id": book.categoryId})

		const newBook = new Book({
			...book,
			id: shortId(),
			category: category._id
		})

		return newBook.save()
	}
}