const Category = require('../models/Category')
const buildAncestors = require('./buildAncestors')

module.exports = async function buildHierarchyAncestors(categoryId, parentId) {
	if (categoryId && parentId) {
		await buildAncestors(categoryId, parentId)
	}

	const result = await Category.find({'parentId': categoryId})

	if (result) {
		result.forEach((doc) => {
			buildHierarchyAncestors(doc._id, categoryId)
		})
	}
}