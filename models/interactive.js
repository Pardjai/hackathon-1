const {Schema, model} = require('mongoose')
const interactiveSchema = new Schema({
    title: {
        type: String,
        required: true,
     },
     oldMessages:[
         {
             content: {
                 type: String,
             },
             answer: {
                 type: String,
             }
         }
     ],
     newMessages:
         {
             content: {
                 type: String,
             }
         },
     action1:{
         action: String,
         Count: {
             type: Number,
             default: 0
         }
     },
     action2:{
        action: String,
        Count: {
            type: Number,
            default: 0
        }
    },
     authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
     },
})

module.exports = model('Interactive', interactiveSchema)