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

router.get('/:id', (req, res) => {
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
	const { description, notes, completed } = req.body;
	const project_id = req.params.id;
	console.log({ description, notes, project_id }, 'test');
	db
		.insert({
			project_id: req.params.id,
			description: req.body.description,
			notes: req.body.notes
		})
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error has occurred with the server', error: err });
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

module.exports = router;
