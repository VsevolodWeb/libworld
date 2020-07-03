const {Schema, model} = require('mongoose')

const Category = {
	_id: Schema.Types.ObjectId,
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String
}

const CategorySchema = new Schema({
	...Category,
	subcategories: [Category]
})

module.exports = model('Category', CategorySchema)