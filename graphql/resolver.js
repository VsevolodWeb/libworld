const shortId = require('shortid')
const Category = require('../models/Category')

module.exports = {
	async addCategory({category: {name, description}}) {
		try {
			const category = new Category({
				id: shortId.generate(), name, description
			})
			await category.save()
			return category
		} catch(e) {
			throw new Error(`Ошибка добавления категории${e}`)
		}
	}
}