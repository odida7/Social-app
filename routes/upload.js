const router = require('express').Router();
const multer = require('multer')

//storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
   // cb(null, Date.now() + file.originalname)
   cb(null, req.body.name);
  },
})

//upload
const upload = multer({ storage: storage })
router.post('/', upload.single('file'), (req, res)=> {
    try{
        return res.status(200).json('File uploaded')
    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router