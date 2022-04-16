const { Router } = require('express')
const req = require('express/lib/request')
const interactive = require('../models/interactive')
const router = Router()
const Interactive = require('../models/interactive')

router.get('/', async (req, res) => {
   const interactives = await Interactive.find()
   res.render('interactives', {
      title:'Интерактивы',
      interactives
   })
})

router.get('/add/:id', (req, res) => {
    res.render('addInteractive', {
        title: 'Интерактивная книга',
        isInteractive: true,
        userId: req.params.id
    })
})

router.post('/add', async (req, res) => {
    const {title, content, variant1, variant2, authorId} = req.body
    const inteactive = new Interactive({
       title,
       content,
       variant1,
       variant2,
       authorId,
    })
 
    try {
       await inteactive.save()
       res.redirect('/profile')
    } catch (err) {
       console.log(err)
    }
 })

 router.post('/allow/:id/:variant', async (req, res) => {
   const interactive = await Interactive.findById(req.params.id)
   interactive[`variant${req.params.variant}Allow`] += 1
   await interactive.save()
   const interactives = await Interactive.find()
   res.json(interactives)
})

module.exports = router