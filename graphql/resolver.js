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
			throw new Error(e)
		}
	},
	async getCategories() {
		try {
			return await Category.find()
		} catch(e) {
			throw new Error(e)
		}
	},

	async getCategoryId({name}) {
		try {
			console.log(name)
			return await Category.findOne({name}).then(response => response.id)
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async removeCategory({id}) {
		try {
			return await Category.deleteOne(id)
		} catch (e) {
			throw new Error(e)
		}
	}
}