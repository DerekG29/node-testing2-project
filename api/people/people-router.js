const router = require('express').Router()
const People = require('./people-model')

router.get('/', (req, res, next) => {
  res.json('[GET] /people')
})

router.get('/:id' , (req, res, next) => {
  res.json(`[GET] /people/${req.params.id}`)
})

router.post('/', (req, res, next) => {
  res.json('[POST] /people')
})

router.delete('/:id', (req, res, next) => {
  res.json(`[DELETE] /people/${req.params.id}`)
})

module.exports = router;