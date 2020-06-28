const {Schema, model} = require('mongoose')


const CategorySchema = new Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String,
	subcategories: [
		{
			id: {type: String, required: true, unique: true}
		}
	]
})

module.exports = model('Category', CategorySchema)