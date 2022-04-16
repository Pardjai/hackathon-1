const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')
const User = require("../models/user");

router.get('/:id', auth, (req, res) => {
    res.render('verification', {
       title: 'Верификация',
       isVerification: true,
    })
})

router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.isAuthor = true
        await user.save()
  
        res.redirect('/profile')
     } catch (e) {
        console.log(e)
     }
})

module.exports = router