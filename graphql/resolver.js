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
			return await Category.findOne({name}).then(response => {
				if(response) {
					return response.id
				}
			})
		} catch(e) {
			throw new Error(e)
		}
	},
	
	async removeCategory({id}) {
		try {
			const candidate = await Category.findOne({id})

			await Category.deleteOne({id: candidate.id})

			return candidate
		} catch (e) {
			throw new Error(e)
		}
	},

	async getCategory({id}) {
		try {
			return await Category.findOne({id})
		} catch(e) {
			throw new Error(e)
		}
	},
}