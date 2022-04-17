const { Router } = require('express')
const interactive = require('../models/interactive')
const router = Router()
const Interactive = require('../models/interactive')

router.get('/', async (req, res) => {
   const interactives = await Interactive.find().populate('authorId', 'name')
   res.render('interactives', {
      title:'Интерактивы',
      interactives
   })
})

router.get('/:id', async(req,res)=>{
   const interactive = await Interactive.findOne({_id: req.params.id}).populate('authorId', 'name')
   res.render('interactive', {
      title: interactive.title,
      interactive
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
       authorId,
    })
 
    try {
       await inteactive.save()
       res.redirect('/profile')
    } catch (err) {
       console.log(err)
    }
 })

 router.post('/write/:id', async (req, res) => {
    const interactive = await Interactive.findById(req.params.id)
    let oldMessages = [...interactive.oldMessages]
   
   const answer = interactive.action1.Count > interactive.action2.Count ? interactive.action1.action : interactive.action2.action
   console.log(interactive.newMessages);
    oldMessages.push({
      content: interactive.newMessages.content,
      answer,
   })
   interactive.newMessages = {
      content: req.body.content
   }
   interactive.action1 = {
      action: req.body.variant1
   }
   interactive.action2 = {
      action: req.body.variant2
   }
   if (oldMessages.content != ''){
   interactive.oldMessages = oldMessages
   }



    await interactive.save()

    res.redirect(`/interactives/${req.params.id}`)
 })

 router.post('/mark/:id/:num', async (req, res) => {
   const interactive = await Interactive.findById(req.params.id)
   interactive[`action${req.params.num}`].Count += 1
   await interactive.save()
    res.redirect(`/interactives/${req.params.id}`)
 })

module.exports = router