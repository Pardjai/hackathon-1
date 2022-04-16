const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('firstSteps', {
       title: 'Первые шаги',
    })
})

module.exports = router