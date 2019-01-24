const dns = require('dns')
const url = require('url')

const { body, validationResult } = require('express-validator/check')


exports.checkUrl = (req, res, next) => {  
   return body('url', 'invalid URL')
      .trim()
      .isURL()
      .isLength({ min: 7, max: 2000 })      
}


exports.checkHost = (req, res, next) => {
   const domain = url.parse(req.body.url.trim()).hostname         
     dns.lookup(domain, (err) => {
        if (err) { return res.json({ error: 'invalid Hostname' }) }  
       return next()
     })  
}


exports.validationErrors = (req, res, next) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      return res.status(422)
         .json({ error: errors.array()[0].msg || 'invalid URL' })
   }
   return next()
}
