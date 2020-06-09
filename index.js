const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/books', require('./routes/books.routes'));

const PORT = config.get('port') || 5000;

(async() => {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		app.listen(PORT, (error) => {
			if (error) throw error;

			console.log(`App has been started on port ${PORT}...`);
		});
	} catch (e) {
		console.log('Server error', e.message);
		process.exit(1);
	}
})();