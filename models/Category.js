const {Schema, model} = require('mongoose');

const schema = new Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true, unique: true},
	description: String
});

module.exports = model('Category', schema);