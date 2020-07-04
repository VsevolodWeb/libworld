const {Schema, model} = require('mongoose')
const slugify = require('../helpers/slugify')

const CategorySchema = new Schema({
	name: String,
	slug: { type: String, index: true },
	parent: {
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
		slug: String
	}]
});

CategorySchema.pre('save', async function (next) {
   this.slug = slugify(this.name);
   next();
});

module.exports = model('Category', CategorySchema)