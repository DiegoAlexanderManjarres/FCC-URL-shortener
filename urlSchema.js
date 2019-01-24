const { Schema, model } = require('mongoose')


const urlSchema = new Schema({
   originalUrl: { type: String, required: true },
   shortUrl: { type: Number, required: true }
})


module.exports = model('urls', urlSchema)