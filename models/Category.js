const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
	name: {type: String, unique: true, required: true},
	description: {type: String, required: true},
	parentId: {
		type: Schema.Types.ObjectId,
		default: null,
		ref: 'Category'
	},
	ancestors: [{
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			index: true
		},
		name: String,
		description: String
	}]
});

module.exports = model('Category', CategorySchema)