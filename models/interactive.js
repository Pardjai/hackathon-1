const {Schema, model} = require('mongoose')
const interactiveSchema = new Schema({
    title: {
        type: String,
        required: true,
     },
     content: {
         type: String,
     },
     variant1: String,
     variant2: String,
     variant1Allow: {
         type: Number,
         default: 0
     },
     variant2Allow:  {
        type: Number,
        default: 0
    },
     authorId: {
        type: Schema.Types.ObjectId,
        required: true,
     },
})

module.exports = model('Interactive', interactiveSchema)