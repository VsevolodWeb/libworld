const Category = require('../models/Category')

module.exports = {
	async addCategory({name, description}) {
		try {
			const category = new Category({
				name, description
			})
			await category.save();
		} catch(e) {
			console.log(e);
		}
	}
}