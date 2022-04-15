const { Schema, model } = require('mongoose')
// создание полей и их значений по умолчанию, которые будут использоваться в каждом докуменгте
const bookSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   url: {
       type: String,
       required: true
   },
})

module.exports = model('Book', bookSchema) // функция model позволяет создавать и регистрировать новые модели на основе Schema
