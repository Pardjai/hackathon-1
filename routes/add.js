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
   const {title, author, email} = req.body
   const application = new Application({
      title,
      author,
      email,
      userId: req.user, // можно записать 'req.user'. т.к. в модели application (models/application) полю userId задан тип ObjectId, и mongoose сам  подставит туда id
   })

   try {
      console.log(application);
      await application.save()
      smtpTransport.sendMail(addEmail(email, title), (err, res) => {
         err ? console.log(err) :
         smtpTransport.close()
      })
      res.redirect('/applications')
   } catch (err) {
      console.log(err)
   }
})

module.exports = router
