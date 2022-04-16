const { Schema, model } = require('mongoose')
// создание полей и их значений по умолчанию, которые будут использоваться в каждом докуменгте
const applicationSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true,
   },
   genre: {
      type: String,
      required: true,
   },
   email: {
       type: String,
       required: true
   },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
})

module.exports = model('Application', applicationSchema) // функция model позволяет создавать и регистрировать новые модели на основе Schema
