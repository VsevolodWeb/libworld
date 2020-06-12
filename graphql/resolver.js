const Category = require('../models/Category')

module.exports = {
	async addCategory({name, description}) {
		try {
			const category = new Category({
				name, description
			})
			await category.save()
			return category
		} catch(e) {
			throw new Error('Ошибка добавления категории')
		}
	}
}