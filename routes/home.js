/* создание объекта роутера */
const { Router } = require('express')
const router = Router()
const Book = require('../models/book')


/* обработака http-запросов */
router.get('/', async (req, res) => {
const books = await Book.find({genre: 'Учебники'})
const news  = books.slice(0,3)
    res.render('index', {
        isHome: true,
        title: 'Домашняя',
        genres: [
            {
                genre: 'Учебники'
            },
            {
                genre: 'Поэзия'
            },
            {
                genre: 'Детские'
            },
            
        ],
        news,
    })
})

/* экспорт модуля */
module.exports = router