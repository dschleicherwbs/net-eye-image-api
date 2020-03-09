var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.IMAGE_PATH);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res, next) => {
  try {
    console.log(req.file);

    if (!req.file) {
      res.status(500).json(req);
    }
    res
      .status(200)
      .json({ fileUrl: process.env.BASE_PATH + req.file.filename });
  } catch (error) {
    return next(error);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
