const { Router } = require('express')
const Book = require('../models/book.js')
const router = Router()

router.get('/', async (req, res) => {
   try {
      const books = await Book.find() // если параметры метода find не заданы, он возвращает вообще все данные из базы (в данном случае все курсы, заменяя метод getAll использованный в прошлом проекте ("part 3-1") для работы с файловым хранилищем данных)
         .select('title author url')
      res.render('books', {
         title: 'Книги',
         isBooks: true,
         books,
      })
   } catch (e) {
      console.log(e)
   }
}) 

router.get('/genres', async(req, res) => {
   res.render('genres', {
      title: 'Жанры',
      genres: [
         {
             genre: 'Детектив'
         },
         {
             genre: 'Фантастика'
         },
         {
             genre: 'Роман'
         },
         {
             genre: 'Приключения'
         },
         {
             genre: 'Учебники'
         },
         {
             genre: 'Поэзия'
         },
         {
             genre: 'Детские'
         },
         
     ]
  })
})

router.get('/genres/:genre', async (req, res) => {
   const books = await Book.find({genre: req.params.genre})

   res.render('books', {
      title: `Книги жанра ${req.params.genre}`,
      books
   })
})

router.get('/:id', async (req, res) => {
   // конструкция "/:id" передаёт часть url после слеша (и до следующего слеша, если он есть) в качестве значения параметра "id" в request (request.params.id)
   try {
      const book = await Book.findById(req.params.id) // findByID соответственно находит курс в базе по его id
      res.render('book', {
         title: book.title,
         author: book.author,
         genre: book.genre,
         url: book.url
      })
   } catch (e) {
      console.log(e)
   }
})

router.post('/search', async (req, res) => {
   try{
      const candidateBooks = await Book.find({title : req.body.title})
   res.render('books', {
      title: 'Книги',
         isBooks: true,
         books: candidateBooks,
   })
   } catch(e){
      console.log(e);
   }
   
})

module.exports = router