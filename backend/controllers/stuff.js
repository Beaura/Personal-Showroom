const Thing = require('../models/thing');
const fs = require('fs');

// !!! quand le titre de l'objet à vendre compte un caratère special(?! etc), bug de post
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject,
        // on indique dynamiquement le nom
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error }));
};

// avant l'utilisation de multer (pas besoin de trouver l'extension ni nom du fichier)

// exports.createThing = (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
//     .catch(error => res.status(400).json({ error }));
// };

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    // on va chercher l'objet en base avant de le supprimer pour obtenir le nom de l'image
    Thing.findOne({_id: req.params.id})
    .then(thing => {
        // extraction du nom du fichier, 2 parties: tout se qui est avant '/images/' et ce qui est après = nom du fichier
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Thing.deleteOne({ _id: req.params.id })
    .then( () => res.status(200).json('Objet à bien été supprimé'))
    .catch(error => res.status(400).json({ error}));
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    // si pas de req.file c'est qu'il n'y a pas eu de modif d'image, operateur ternaire:
    const thingObject = req.file ?
    {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then( () => res.status(200).json({ message:'MAJ objet réussie'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};