const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
	db
		.get()
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: ' An Error with the server has occurred' });
		});
});

router.get('/:id', (req, res) => {
	db
		.get(req.params.id)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error with the server has occurred' });
		});
});

//custom middleware

function validateProject(req, res, next) {
	if (req.body.name.length > 0 && req.body.description.length > 0) {
		next();
	} else {
		res.status(400).json({ message: 'Please provide a name for the project and Description' });
	}
}

function validateUpdate(req, res, next) {
	if (req.body.name.length > 0 || req.body.description.length > 0) {
		next();
	} else {
		res.status(400).json({ message: 'Please update a name for the Project or Description' });
	}
}

module.exports = router;
