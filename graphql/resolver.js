const shortId = require('shortid')
const Category = require('../models/Category')

module.exports = {
	async addCategory({category: {name, description, subcategoryId}}) {
		try {
			const CategoryFields = {
				id: shortId(), name, description
			}

			if (subcategoryId) {
				const category = await Category
					.findOneAndUpdate(
						{id: subcategoryId}, {$push: {subcategories: CategoryFields}}
					)

				if (!category) return new Error("Ошибка добавления подкатегории")

				return CategoryFields
			}

			const newCategory = new Category(CategoryFields)

			return await newCategory.save()

		} catch (e) {
			throw new Error(e)
		}
	},
	async getCategories() {
		try {
			return await Category.find().where("subcategories").ne([])
		} catch (e) {
			throw new Error(e)
		}
	},

	async removeCategory({id}) {
		try {
			const removedCategory = await Category.findOneAndDelete({id})

			if (!removedCategory) {
				await Category
					.findOneAndUpdate({"subcategories.id": id}, {$pull: {"subcategories": {id}}})
			}

			return id
		} catch (e) {
			throw new Error(e)
		}
	},

	async getCategory({id}) {
		try {
			return await Category.findOne({$or: [{id}, {"subcategories.id": id}]})
				.then(category => {
					if (!category) return new Error("Категория не найдена")

					return category.id === id ? category : category.subcategories.find(item => item.id === id)
				})
		} catch (e) {
			throw new Error(e)
		}
	},

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