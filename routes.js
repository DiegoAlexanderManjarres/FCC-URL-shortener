const express = require('express')

const { checkUrl, validationErrors, checkHost } = require('./validators')
const { postShortUrls, getShortUrl } = require('./controllers')


const router = express.Router()

router.post('/shorturl/new', checkUrl(),  validationErrors, checkHost, postShortUrls)

router.get('/shorturl/:shorturl', getShortUrl)

module.exports = router