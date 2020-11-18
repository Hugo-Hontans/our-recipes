const Image = require('../schema/imageSchema');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.resolve(__dirname, '../assets/images');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: {fileSize: 1000000, files: 5}
});

// Upload image
const uploadImage = ((req, res, next) => {
    const images = req.files.map((file) => {
        return {
            filename: file.filename,
            originalname: file.originalname,
        }
    });
    Image.insertMany(images, (err, result) => {
        if (err) return res.sendStatus(404)
        res.json(result[0]);
    });
});

// Get image with id
const getImage = ((req, res, next) => {
  Image.findOne({_id: req.params.id}, (err, image) => {
    if (err) return res.sendStatus(404);
    fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res);
  })
})

module.exports = function (app) {
    app.get('/getimage/:id', getImage);
    app.post('/upload', upload.array('image', 5), uploadImage);
}
