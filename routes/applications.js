const { Router } = require('express')
const Application = require('../models/application.js')
const router = Router()

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id) // findByID соответственно находит курс в базе по его id
  
        res.render('application', {
           layout: 'application',
           title: application.title,
           application,
        })
     } catch (e) {
        console.log(e)
     }

})

module.exports = router