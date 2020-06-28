const shortId = require('shortid')
const Category = require('../models/Category')

module.exports = {
	async addCategory({category: {name, description, parentId}}) {
		try {
			const CategoryFields = {
				id: shortId.generate(), name, description
			}

			if (parentId !== "null") {

				const parentCategory = await Category.findOne({id: parentId})
				parentCategory.subcategories = [...parentCategory.subcategories, CategoryFields]

				await parentCategory.save()

				return CategoryFields
			} else {
				const newCategory = new Category({...CategoryFields, subcategories: []})


				await newCategory.save();
				console.log({...CategoryFields})

				return CategoryFields
			}

		} catch (e) {
			throw new Error(e)
		}
	},
	async getCategories() {
		try {
			return await Category.find()
		} catch (e) {
			throw new Error(e)
		}
	},

	async getCategoryId({name}) {
		try {
			return await Category.findOne({name}).then(response => {
				if (response) {
					return response.id
				}
			})
		} catch (e) {
			throw new Error(e)
		}
	},

	async removeCategory({id, parentId}) {
		try {
			let removedCategory

			if (parentId) {
				removedCategory = await Category.findOneAndUpdate({id: parentId}, {$pull: {"subcategories": {id}}})
			} else {
				removedCategory = await Category.findOneAndDelete({id})
			}

			return id
		} catch (e) {
			throw new Error(e)
		}
	},

	async getCategory({id}) {
		try {
			return await Category.findOne({id})
		} catch (e) {
			throw new Error(e)
		}
	},

	async updateCategory({category}) {
		try {
			return await Category.findOneAndUpdate({id: category.id}, {...category}, {new: true})
		} catch (e) {
			throw new Error(e)
		}
	},
}