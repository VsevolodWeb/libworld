const mongoose = require("mongoose")
const shortId = require('shortid')
const Category = require('../../models/Category')
const buildAncestors = require('../../helpers/buildAncestors')
const buildHierarchyAncestors = require('../../helpers/buildHierarchyAncestors')

module.exports = {
	async createCategory({category: {name, description, parentId}}) {
		const parentIdValue = parentId ? parentId : null;
		const category = new Category({name, description, parentId})

		try {
			const newCategory = await category.save()
			await buildAncestors(newCategory._id, parentIdValue)

			return newCategory
		} catch (e) {
			return new Error(e)
		}
	},
	async readCategory({id}) {
		try {
			return await Category.findOne({_id: id})
		} catch (e) {
			return new Error(e)
		}
	},
	async updateCategory({category: {_id, name, description, parentId}}) {
		try {
			const category = await Category.findByIdAndUpdate(_id, {$set: {name, description, parentId}});
			await buildHierarchyAncestors(_id, parentId);

			return category
		} catch (e) {
			return new Error(e)
		}
	}
	// async addCategory({category: {name, description, parentId}}) {
	// 	try {
	// 		const CategoryFields = {
	// 			_id: new mongoose.Types.ObjectId(), id: shortId(), name, description
	// 		}
	//
	// 		if (parentId) {
	// 			const category = await Category
	// 				.findOneAndUpdate(
	// 					{id: parentId}, {$push: {subcategories: CategoryFields}}
	// 				)
	//
	// 			if (!category) return new Error("Ошибка добавления подкатегории")
	//
	// 			return CategoryFields
	// 		}
	//
	// 		const newCategory = new Category(CategoryFields)
	//
	// 		return await newCategory.save()
	//
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
	// async getCategories() {
	// 	try {
	// 		return await Category.find()
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
	//
	// async removeCategory({id}) {
	// 	try {
	// 		const removedCategory = await Category.findOneAndDelete({id})
	//
	// 		if (!removedCategory) {
	// 			const removedSubcategory = await Category
	// 				.findOneAndUpdate(
	// 					{"subcategories.id": id},
	// 					{$pull: {"subcategories": {id}}}
	// 				)
	//
	// 			if (!removedSubcategory) return new Error("Категория не найдена")
	// 		}
	//
	// 		return id
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
	//
	// async getCategory({id}) {
	// 	try {
	// 		return await Category.findOne({$or: [{id}, {"subcategories.id": id}]})
	// 			.then(category => {
	// 				if (!category) return new Error("Категория не найдена")
	//
	// 				return category.id === id ? category : category.subcategories.find(item => item.id === id)
	// 			})
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
	//
	// async updateCategory({category: {id, name, description}}) {
	// 	try {
	// 		let updatedCategory = await Category
	// 				.findOneAndUpdate({id}, {name, description}, {new: true})
	//
	// 		if (!updatedCategory) {
	// 			updatedCategory = await Category
	// 				.findOneAndUpdate({"subcategories.id": id}, {
	// 					$set: {
	// 						"subcategories": {id, name, description}
	// 					}
	// 				},
	// 				{new: true})
	// 				.then(res => res.subcategories.find(item => item.id === id))
	//
	// 		}
	//
	// 		return updatedCategory || new Error("Категория не найдена")
	//
	// 	} catch (e) {
	// 		throw new Error(e)
	// 	}
	// },
}