const dns = require('dns')
const URL = require('url')

const Url = require('./urlSchema')




exports.postShortUrls = async (req, res, next) => {
   try {
      const originalUrl = req.body['url'].trim()       
      
      const totalUrls = await Url.find().countDocuments()
      const existingUrl = await Url.findOne({ originalUrl })    

      if (existingUrl) {
         return res.status(200).json({ 
               original_url: existingUrl.originalUrl, 
               short_url: existingUrl.shortUrl 
            })
      } else {
         const shortUrl = (+totalUrls || 0) + 1
         const url = new Url({ originalUrl, shortUrl })
         await url.save()

         return res.status(201)
            .json({ original_url: url.originalUrl, short_url: url.shortUrl })
      }
      
   } catch(err) {
     console.log('catch----------------',err)
       // res.status(422).json({ error: err.error || 'invalid URL' })
     throw err 
   }
}


exports.getShortUrl = async (req, res, next) => {
   try {
      const shortUrl = +req.params.shorturl
      const url = await Url.findOne({ shortUrl })
      if(!url) { throw new Error('Not a valid URL') }

      res.status(200).redirect(url.originalUrl)

   } catch (err) { 
      res.status(500).json({ error: err.message })
      next(err) 
   }
}
