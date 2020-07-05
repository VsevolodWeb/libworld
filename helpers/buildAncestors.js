const Category = require('../models/Category')

module.exports = async function buildAncestors(id, parentId) {
	try {
		let parent_category = await Category
			.findOne(
				{"_id": parentId},
				{"name": 1, "description": 1, "ancestors": 1})

		if (parent_category) {
			const {_id, name, description} = parent_category;
			const ancest = [...parent_category.ancestors];
			ancest.unshift({_id, name, description})

			await Category.findByIdAndUpdate(id, {$set: {"ancestors": ancest}});
		}
	} catch (err) {
		console.log(err.message)
	}
}