const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// const Thing = require('../models/thing');

// ATTENTION A L'ORDRE DES IMPORTS DANS LES METHODES !!!
// multer APRES l'authentification

router.post('/', auth, multer, stuffCtrl.createThing);
// DEPLACE DANS CONTROLLERS
// router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
//     .catch(error => res.status(400).json({ error }));
// });

// répond qu'aux requêtes GET pour UN objet
router.get('/:id', auth, stuffCtrl.getOneThing);
// router.get('/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// });

// MODIFICATION - PUT
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// router.put('/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then( () => res.status(200).json({ message:'MAJ objet réussie'}))
//     .catch(error => res.status(400).json({ error }));
// });

// DELETE
router.delete('/:id', auth, stuffCtrl.deleteThing);
// router.delete('/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//     .then( () => res.status(200).json('Objet à bien été supprimé'))
//     .catch(error => res.status(400).json({ error}));
// });

// le frontend va accéder à cette adresse pour récupérer TOUS les Things
router.get('/', auth, stuffCtrl.getAllThings);
// router.get('/', (req, res, next) => {
//     Thing.find()
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({ error }));
// });

module.exports = router;