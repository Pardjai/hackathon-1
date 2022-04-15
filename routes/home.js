/* создание объекта роутера */
const { Router } = require('express')
const router = Router()


/* обработака http-запросов */
router.get('/', (req, res) => {
    res.render('index', {
        isHome: true,
        title: 'Страница'
    })
})


/* экспорт модуля */
module.exports = router