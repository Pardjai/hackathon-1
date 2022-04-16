const multer = require('multer')
const crypto = require('crypto')

const storage = multer.diskStorage({
   // в объекте заданы функции, которые будут вызваны, в процессе загрузки файла
   destination(req, file, cb) {
      cb(null, 'verifImage')
   },
   filename(req, file, cb) {
      cb(null, crypto.randomBytes(12).toString('hex') + '-' + file.originalname)
   },
})

const allowedImgTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
   if (allowedImgTypes.includes(file.mimetype)) {
      cb(null, true)
   } else {
      cb(null, false)
   }
}

module.exports = multer({
   storage,
   fileFilter,
})
