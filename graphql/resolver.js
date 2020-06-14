const shortId = require('shortid')
const Category = require('../models/Category')

module.exports = {
	async addCategory({category: {name, description}}) {
		try {
			const newCategory = new Category({
				id: shortId.generate(), name, description
			})
			await newCategory.save()
			return newCategory
		} catch(e) {
			throw new Error(`Ошибка добавления категории${e}`)
		}
	},
	async getCategories() {
		try {
			return await Category.find({}, function() {

			})
		} catch(e) {
			throw new Error(`Ошибка добавления категории${e}`)
		}
	}
}