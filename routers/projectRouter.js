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

router.post('/', validateProject, (req, res) => {
	db
		.insert(req.body)
		.then((removed) => {
			res.status(200).json(removed);
		})
		.catch((err) => {
			res.status(500).json({ message: 'An Error with the server has occurred' });
		});
});

router.delete('/:id', validateProjectId, (req, res) => {
	db
		.remove(res.params.id)
		.then((removed) => {
			res.status(200).json(removed);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Unable to remove project' });
		});
});

//custom middleware

function validateProjectId(req, res, next) {
	db
		.get(res.params.id)
		.then((response) => {
			if (response) {
				next();
			} else {
				res.status(404).json({ message: 'Project does not exist' });
			}
		})
		.catch((err) => {
			res.status(400).json({ message: 'Invalid Id, does not exist' });
		});
}

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
