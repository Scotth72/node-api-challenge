const express = require('express');

const db = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
	db
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error has occurred with the server' });
		});
});

router.get('/:id', validateActionId, (req, res) => {
	db
		.get(req.params.id)
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error has occurred with the server' });
		});
});

router.post('/:id', (req, res) => {
	const { description, notes } = req.body;
	const { project_id } = req.params.id;
	db
		.insert(description, notes, project_id)
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error has occurred with the server' });
		});
});

router.put('/:id', (req, res) => {
	db
		.update(req.params.id, req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error has occurred updating' });
		});
});

//custom Middleware
function validateActionId(req, res, next) {
	db
		.get(req.params.id)
		.then((response) => {
			if (response) {
				next();
			} else {
				res.status(400).json({ message: 'An Error has occurred' });
			}
		})
		.catch((err) => {
			res.satus(400).json({ message: 'Error has occurred' });
		});
}

function validateAction(req, res, next) {
	if (req.params.id) {
		if (req.body.description.length > 0 && req.body.description.length < 128 && req.body.notes.length > 0) {
			next();
		} else {
			res.status(400).json({ message: 'Please enter information correctly' });
		}
	} else {
		res.status(400).json({ message: 'Error has occurred' });
	}
}

module.exports = router;
