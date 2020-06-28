const shortId = require('shortid')
const Category = require('../models/Category')

module.exports = {
	async addCategory({category: {name, description, subcategoryId}}) {
		try {
			const CategoryFields = {
				id: shortId(), name, description
			}

			if (subcategoryId) {
				await Category
					.findOneAndUpdate({id: subcategoryId}, {$set: {subcategories: {id: CategoryFields.id}}})
			}

			const newCategory = new Category(CategoryFields)

			return await newCategory.save()
		} catch (e) {
			throw new Error(e)
		}
	},
	// async getCategories() {
	// 	try {
	// 		return await Category.find()
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },

	// async removeCategory({id, parentId}) {
	// 	try {
	// 		let removedCategory
	//
	// 		if (parentId) {
	// 			removedCategory = await Category.findOneAndUpdate({id: parentId}, {$pull: {"subcategories": {id}}})
	// 		} else {
	// 			removedCategory = await Category.findOneAndDelete({id})
	// 		}
	//
	// 		return id
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },

	// async getCategory({id, parentId}) {
	// 	try {
	// 		let candidate;
	//
	// 		if(parentId) {
	// 			candidate = await Category.findOne({id: parentId, subcategories: {id}})
	// 		} else {
	// 			candidate = await Category.findOne({id})
	// 		}
	// 		console.log(candidate)
	// 		return candidate
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },

	// async updateCategory({category}) {
	// 	try {
	// 		let updatedCategory;
	//
	// 		if (category.parentId) {
	// 			updatedCategory = await Category
	// 				.findOneAndUpdate({id: category.parentId}, {$set: {"subcategories": {id: category.id}}})
	// 		} else {
	// 			updatedCategory = await Category
	// 				.findOneAndUpdate({id: category.id}, {...category}, {new: true})
	// 		}
	// 		return updatedCategory
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
}