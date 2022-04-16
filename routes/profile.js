const { Router } = require('express')
const router = Router()
const auth = require('../middlewares/auth')
const User = require('../models/user')

router.get('/', auth, async (req, res) => {
   const user = await User.findById(req.session.user._id)
   res.render('profile', {
      title: 'Профиль',
      isProfile: true,
      user,
   })
})

router.get('/interactive', async(req, res) => {
   res.render('interactive', {
      title: 'Интерактивная книга',
      isInteractive: true,
   })
})

router.post('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.session.user._id)

      const toChange = {
         name: req.body.name,
      }

      if (req.file) {
         toChange.avatarUrl = req.file.path
      }

      Object.assign(user, toChange)
      await user.save()

      res.redirect('/profile')
   } catch (e) {
      console.log(e)
   }
})

module.exports = router
