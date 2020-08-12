const Category = require('../../models/Category')
const Book = require('../../models/Book')
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
	async readCategories() {
		try {
			return await Category.find()
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
			const category = await Category.findByIdAndUpdate(_id, {$set: {name, description, parentId}}, {new: true});

			await buildHierarchyAncestors(_id, parentId);

			return category
		} catch (e) {
			return new Error(e)
		}
	},
	async deleteCategory({id}) {
		try {
			const removedCategory = await Category.findByIdAndRemove(id)

			await Book.deleteMany({'category': id})

			if (!removedCategory.parentId) {
				await Category.deleteMany({'ancestors.id': id})
			}

			return id
		} catch (e) {
			console.log(e)
		}
	}
}