const Category = require('../models/Category')

module.exports = async function buildAncestors(id, parent_id) {
	try {
		let parent_category = await Category
			.findOne(
				{"_id": parent_id},
				{"name": 1, "slug": 1, "ancestors": 1})
			.exec()

		if (parent_category) {
			const {_id, name, slug} = parent_category;
			const ancest = [...parent_category.ancestors];
			ancest.unshift({_id, name, slug})

			await Category.findByIdAndUpdate(id, {$set: {"ancestors": ancest}});
		}
	} catch (err) {
		console.log(err.message)
	}
}