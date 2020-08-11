const fs = require("fs")
const shortId = require('shortid')
const Book = require("../../models/Book")
const {readCategory} = require("../resolvers/category.resolver")
const decodeBase64Image = require("../../helpers/decodeBase64Image")

module.exports = {
	async createBook({book}) {
		try {
			const category = await readCategory({id: book.categoryId})

			if (!category) return new Error("Такой категории не существует")

			const hasCover = () => {
				return book.cover !== "null"
			}

			const coverName = `${shortId.generate()}.jpg`

			const newBook = new Book({
				...book, cover: hasCover() ? coverName : "", category
			})

			let result = await newBook.save()

			if (hasCover()) {
				const coverWrapper = decodeBase64Image(book.cover)

				fs.writeFile(`public/books-images/${coverName}`, coverWrapper.data, (err) => {
					if (err) throw err
				})
			}

			return result

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
	async updateBook({book: {_id, name, description, cover, author, year, categoryId}}) {
		try {
			const resultBook = {_id, name, description, author, year, category: categoryId}

			if (cover !== 'null') {
				const coverName = shortId.generate() + '.jpg'
				const coverWrapper = decodeBase64Image(cover)

				resultBook.cover = coverName

				fs.writeFile(`public/books-images/${coverName}`, coverWrapper.data, (err) => {
					if (err) throw err
				})
			}

			let resultPromise

			await Book.findById(
				_id,
				async (err, doc) => {
					if (err) throw err

					if (resultBook.cover) {
						fs.unlink(`public/books-images/${doc.cover}`, (err) => {
						  if (err) throw err;
						});
					}

					for (let key in resultBook) {
						doc[key] = resultBook[key]
					}

					resultPromise = doc.save()
				}
			)

			return await resultPromise
		} catch (e) {
			console.log(e)
		}
	},
	async deleteBook({_id}) {
		try {
			await Book.findByIdAndDelete(_id, (err, res) => {
				if (res && res.cover) {
					fs.unlink(`public/books-images/${res.cover}`, (err) => {
						if (err) throw err
					})
				}
			})

			return _id
		} catch (e) {
			throw new Error(e)
		}
	},
}