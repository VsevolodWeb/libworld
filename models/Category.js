const {Schema, model} = require('mongoose');

const Category = {
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String
}

const schema = new Schema({
	...Category,
	subcategories: [Category]
});

module.exports = model('Category', schema);