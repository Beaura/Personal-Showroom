const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({
    // dire a multer où enregister les fichier
    destination: (req, file, callback) => {
        // 1e argument "null" pour dire qu'il n'y a pas eu d'erreur à ce niveau là
        // 2e argument: le nom du dossier de stockage
        callback(null, 'images')
    },
    // 2e élement pour indiquer quel nom de fichier utiliser
    filename: (req, file, callback) => {
        // remplaçons les espaces par des "_"
        const name = file.originalname.split(' ').join('_');
        // applique une extension au fichier (on a acces à son Mime type)
        const extension = MIME_TYPES[file.mimetype];
        // ajout d'un timestamp (avec Date.now() ) pour rendre le nom quasi unique
        callback(null, name + Date.now() + '.' + extension);
    }
});
// .single() pour dire que c'est un fichier unique    et en parametre "image" pour dire à multer que ce sont des images uniquement
module.exports = multer({ storage }).single('image');