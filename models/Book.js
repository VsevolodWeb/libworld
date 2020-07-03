const {Schema, model} = require('mongoose');

const schema = new Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String,
	//cover: String, //?
	//text: {type: String, required: true, unique: true}, //?
	author: String,
	category: {type: Schema.ObjectId, ref: 'Category'},
	year: Number
});

module.exports = model('Book', schema);