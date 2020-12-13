const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require ('./routes/stuff');
const userRoutes = require('./routes/user');

// plus besoin car logique route deplacé
// const Thing = require('./models/thing');
const { json } = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://user:<password>@cluster0.4aeqt.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));

// Ces headers permettent :
//     d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//     d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//     d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// transforme le corps de la requête en obj javasript utilisable (= JSON)
app.use(bodyParser.json());

// dire à express de servir le dossier images (dossier statique ici)
// ATTENTION!!! __ et pas _dirname!!!!!!!!
app.use('/images', express.static(path.join(__dirname, 'images')));


// pour pouvoir utiliser les routes pour /routes/stuff
app.use('/api/stuff', stuffRoutes);

//pour pouvoir utiliser les routes des /routes/user
app.use('/api/auth', userRoutes);

module.exports = app;

// TOUTE LA LOGIQUE DE ROUTE A ETE DEPLACE DANS routes/stuff.js


// traitera les req. POST
// app.post('/api/stuff', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//         ...req.body
//     });
//     thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
//     .catch(error => res.status(400).json({ error }));
// });

// // répond qu'aux requêtes GET
// app.get('/api/stuff/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// });

// // MODIFICATION - PUT
// app.put('/api/stuff/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then( () => res.status(200).json({ message:'MAJ objet réussie'}))
//     .catch(error => res.status(400).json({ error }));
// });

// // DELETE
// app.delete('/api/stuff/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//     .then( () => res.status(200).json('Objet à bien été supprimé'))
//     .catch(error => res.status(400).json({ error}));
// });


// //app.use('http://localhost:3000/api/stuff', (req, res, next) => {})
// // le frontend va accéder à cette adresse pour récupérer TOUS les Things
// app.get('/api/stuff', (req, res, next) => {
//     Thing.find()
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({ error }));
   
// //  Avant la connexion à la BDD

//     // const stuff = [
//     //     {
//     //         _id: 'oeihfzeoi',
//     //         title: 'Mon premier objet',
//     //         description: 'Les infos de mon premier objet',
//     //         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//     //         price: 4900,
//     //         userId: 'qsomihvqios',
//     //     },
//     //     {
//     //         _id: 'oeihfzeomoihi',
//     //         title: 'Mon deuxième objet',
//     //         description: 'Les infos de mon deuxième objet',
//     //         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//     //         price: 2900,
//     //         userId: 'qsomihvqios',
//     //     },
//     // ];
//     // res.status(200).json(stuff);
// });

// exemples pour middlewares
// app.use((req ,res, next) => {
//     console.log('requête reçue');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// })

// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête à bien été reçue'});
//     next();
// });

// app.use((req, res) => {
//     console.log('la réponse a été envoyé avec success');
// })

