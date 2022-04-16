const { Router } = require('express')
const Application = require('../models/application.js')
const Book = require('../models/book.js')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
    try {
        const applications = await Application.find() // если параметры метода find не заданы, он возвращает вообще все данные из базы (в данном случае все курсы, заменяя метод getAll использованный в прошлом проекте ("part 3-1") для работы с файловым хранилищем данных)
           .populate('userId', 'email')
           .select('email title')
        
           res.render('applications', {
            isApplications: true,
            title: 'Заявки',
            applications, 
         })
     } catch (e) {
        console.log(e)
     }
    
})

router.get('/:id', auth, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id) // findByID соответственно находит курс в базе по его id
  
        res.render('application', {
           title: application.title,
           application,
        })
     } catch (e) {
        console.log(e)
     }

})

router.post('/:id',  async (req, res) => {
   const {title, author, genre, url} = req.body
   const book = new Book({
      title,
      author,
      genre,
      url,
   })
   try {
      await Application.deleteOne({
         _id: req.params.id
      })
      await book.save()
      res.redirect('/')
   } catch (err) {
      console.log(err)
   }
})


module.exports = router