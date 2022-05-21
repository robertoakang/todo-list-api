const express = require('express')

const router = new express.Router()

router.get('/healthcheck', (req, res) => {
  res.json({
    message: 'API v1.0.0'
  })
})

module.exports = router
