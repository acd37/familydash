module.exports = function(app) {
  const multer = require('multer');
  const passport = require('passport');
  const mkdirp = require('mkdirp');

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const dir = `public/${req.user.familyCode}`;
      mkdirp.sync(dir);
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      const fileExtension = file.originalname.split('.').splice(1, 1);

      cb(null, `${req.user.id}.${fileExtension}`);
    }
  });

  const upload = multer({ storage: storage }).single('file');

  // @route GET api/files/test
  // @desc tests the files api route
  app.get('/api/files/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  app.post('/api/files/upload', passport.authenticate('jwt', { session: false }), (req, res) => {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
      } else if (err) {
        console.log(err);
      }

      return res.status(200).send(req.file);
    });
  });
};
