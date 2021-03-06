const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => {
    res.render('private', {
        isPrivate: true,
       title: 'private page'
    })
})

module.exports = router