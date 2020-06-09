const { Router } = require('express');

const Book = require('../models/Book');
const router = Router();

router.get(
	'/',
	async (req, res) => {
		try {
			res.status(200).json({books: []})
		} catch (e) {
			res.status(500).json({ message: 'Что то пошло не так. Попробуйте снова.' })
		}
	}
);


module.exports = router;