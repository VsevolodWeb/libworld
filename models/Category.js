const {Schema, model} = require('mongoose');

const Category = {
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String
}

const CategorySchema = new Schema({
	...Category,
	subcategories: [Category]
});

module.exports = model('Category', CategorySchema)