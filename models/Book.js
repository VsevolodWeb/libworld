const {Schema, model} = require('mongoose');

const schema = new Schema({
	id: {type: Number, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String,
	cover: String,
	text: {type: String, required: true, unique: true},
	author: String,
	categoryId: {type: Number, required: true, unique: true},
	year: Number
});

module.exports = model('Book', schema);