const { Router } = require('express')
const Application = require('../models/application')
const router = Router()
const smtpTransport = require('../emails/mailTransport')
const addEmail = require('../emails/mailOptions/addBook')

router.get('/', (req, res) => {
   res.render('add', {
      title: 'Добавить книгу',
      isAdd: true,
   })
})

router.post('/', async (req, res) => {
   const {title, author, email, genre} = req.body
   const application = new Application({
      title,
      author,
      email,
      genre,
      userId: req.user, // можно записать 'req.user'. т.к. в модели application (models/application) полю userId задан тип ObjectId, и mongoose сам  подставит туда id
   })

   try {
      await application.save()
      smtpTransport.sendMail(addEmail(email, title), (err, res) => {
         err ? console.log(err) :
         smtpTransport.close()
      })
      res.redirect('/')
   } catch (err) {
      console.log(err)
   }
})

module.exports = router
